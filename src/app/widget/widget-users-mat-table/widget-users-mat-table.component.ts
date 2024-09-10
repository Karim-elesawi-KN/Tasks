import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WidgetService } from '../../services/widget.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { EditRowDialog } from './edit-row-dialog';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-widget-users-mat-table',
  standalone: true,
  imports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './widget-users-mat-table.component.html',
  styleUrls: ['./widget-users-mat-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetUsersMatTableComponent implements OnInit {
  displayedColumns: string[] = [
    'Select',
    'ID',
    'Name',
    'Country',
    'Age',
    'Action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //constructor
  constructor(private widgetService: WidgetService, public dialog: MatDialog) {}

  //loading users
  ngOnInit(): void {
    this.loadUserData();
    this.dataSource.filterPredicate = this.createFilter();
    this.displayedColumns.forEach((col) => (this.filterStates[col] = false));
  }
  async loadUserData(): Promise<void> {
    await this.widgetService.loadUsers();
    const users = this.widgetService.getUsers();
    this.dataSource.data = users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //filtering
  @Input() isFilterMode = false;
  filterValues: any = {};
  filterStates: { [key: string]: boolean } = {};
  toggleFilter(col: string) {
    this.filterStates[col] = !this.filterStates[col];
    const inputElement = document.getElementById(
      col + '-filter'
    ) as HTMLInputElement;
    if (this.filterStates[col]) {
      inputElement!.removeAttribute('hidden');
    } else {
      inputElement!.setAttribute('hidden', 'true');
    }
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      let isMatch = true;

      for (const col of Object.keys(searchTerms)) {
        if (
          searchTerms[col] &&
          !data[col]
            .toString()
            .toLowerCase()
            .includes(searchTerms[col].toLowerCase())
        ) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    };
  }
  filterData(col: string, event: any) {
    this.filterValues[col] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  //selection
  toggleSelectAll(event: any): void {
    const isChecked = event.checked;
    this.dataSource.data.forEach((row) => (row.selected = isChecked));
  }
  isAllSelected(): boolean {
    return this.dataSource.data.every((user) => user.selected);
  }

  //Actions
  editRow(row: any): void {
    const dialogRef = this.dialog.open(EditRowDialog, {
      width: '300px',
      data: { ...row },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((r) => r.ID === row.ID);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }
  viewRow(row: any): void {}
  deleteRow(row: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter((r) => r !== row);
    }
  }

  //add User
  addUser(): void {
    const dialogRef = this.dialog.open(EditRowDialog, {
      width: '300px',
      data: { Name: '', Country: '', Age: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.Name && result.Country && result.Age) {
        const newId = this.dataSource.data.length
          ? Math.max(...this.dataSource.data.map((r) => r.ID)) + 1
          : 1;

        const newUser = { ID: newId, ...result };
        this.dataSource.data = [...this.dataSource.data, newUser];
      } else {
        alert('Please fill all fields before adding a user.');
      }
    });
  }

  // Delete Users
  deleteSelectedUsers(): void {
    const selectedUsers = this.dataSource.data.filter((user) => user.selected);

    if (selectedUsers.length > 0) {
      const confirmDelete = confirm(
        `Are you sure you want to delete ${selectedUsers.length} selected user(s)?`
      );
      if (confirmDelete) {
        this.dataSource.data = this.dataSource.data.filter(
          (user) => !user.selected
        );
      }
    } else {
      const confirmDeleteAll = confirm(
        'Are you sure you want to delete all users?'
      );
      if (confirmDeleteAll) {
        this.dataSource.data = [];
      }
    }
  }
  // deleteSelected(): void {
  //   const confirmDelete = confirm(
  //     'Are you sure you want to delete the selected users?'
  //   );
  //   if (confirmDelete) {
  //     this.dataSource.data = this.dataSource.data.filter(
  //       (user) => !user.selected
  //     );
  //   }
  // }
  //   deleteAll(): void {
  //   const confirmDelete = confirm(
  //     'Are you sure you want to delete all the users?'
  //   );
  //   if (confirmDelete) {
  //     this.dataSource.data = [];
  //   }
  // }
}
