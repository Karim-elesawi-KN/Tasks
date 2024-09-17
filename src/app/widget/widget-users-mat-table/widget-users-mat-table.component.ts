import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import {
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

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
    CdkDropListGroup,
    DragDropModule,
  ],
  templateUrl: './widget-users-mat-table.component.html',
  styleUrls: ['./widget-users-mat-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetUsersMatTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Select',
    'ID',
    'Name',
    'Country',
    'Age',
    'Salary',
    'Action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //constructor
  constructor(
    private widgetService: WidgetService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.dataSource.filterPredicate = this.createFilter();
    this.displayedColumns.forEach((col) => (this.filterStates[col] = false));

    this.restoreColumnWidths(); 
    this.restoreColumnOrder();

    setInterval(() => { 
      this.salaries = this.salaries.map(() => this.generateRandomSalary());
    }, 2);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.restoreColumnWidths();
    this.restoreSortingState();
    this.sort.sortChange.subscribe(() => {
      this.saveSortingState();
    });
  }

  //loading users
  async loadUserData(): Promise<void> {
    await this.widgetService.loadUsers();
    const users = this.widgetService.getUsers();
    this.dataSource.data = users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.salaries = this.dataSource.data.map(() => this.generateRandomSalary());
    console.log(this.salaries);
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
  /*deleteSelected(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete the selected users?'
    );
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter(
        (user) => !user.selected
      );
    }
  }
    deleteAll(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete all the users?'
    );
    if (confirmDelete) {
      this.dataSource.data = [];
    }
  }*/

  //reorder Columns
  reorderColumns($event: {
    previousContainer: { id: string };
    container: { id: string };
  }) {
    const fromIndex = this.displayedColumns.indexOf(
      $event.previousContainer.id
    );
    const toIndex = this.displayedColumns.indexOf($event.container.id);
    moveItemInArray(this.displayedColumns, fromIndex, toIndex);
    this.dataSource.data = [...this.dataSource.data];
    localStorage.setItem(
      this.columnOrderKey,
      JSON.stringify(this.displayedColumns)
    );
  }

  //salaries
  salaries: number[] = [];
  generateRandomSalary(): number {
    return Math.floor(Math.random() * 100000) + 30000;
  }

  //saving and restoring table state
  private columnOrderKey = 'columnOrder';
  private sortingStateKey = 'sortingState';
  private columnWidthsKey = 'columnWidths';
  restoreColumnOrder(): void {
    const savedColumnOrder = localStorage.getItem(this.columnOrderKey);
    if (savedColumnOrder) {
      this.displayedColumns = JSON.parse(savedColumnOrder);
    }
  }
  saveSortingState() {
    const sortingState = {
      active: this.sort.active,
      direction: this.sort.direction,
    };
    localStorage.setItem(this.sortingStateKey, JSON.stringify(sortingState));
  }
  restoreSortingState(): void {
    const savedSortingState = localStorage.getItem(this.sortingStateKey);
    if (savedSortingState) {
      const { active, direction } = JSON.parse(savedSortingState);
      this.sort.active = active;
      this.sort.direction = direction;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    }
  }
  restoreColumnWidths(): void {
    const savedWidths = localStorage.getItem(this.columnWidthsKey);
    if (savedWidths) {
      this.columnWidths = JSON.parse(savedWidths);
      this.displayedColumns.forEach((column) => {
        const th = document.getElementById(column);
        if (th && this.columnWidths[column]) {
          th.style.width = `${this.columnWidths[column]}px`;
        }
      });
    }
  }

  //column resizing
  columnWidths: { [key: string]: string } = {};
  startResize(event: MouseEvent, column: string): void {
    event.preventDefault();
    const th = (event.target as HTMLElement).parentElement as HTMLElement;

    const startX = event.pageX;
    const startWidth = th.offsetWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.pageX - startX);
      th.style.width = `${newWidth}px`;
      this.columnWidths[column] = newWidth.toString();
    };

    const onMouseUp = () => {
      localStorage.setItem(
        this.columnWidthsKey,
        JSON.stringify(this.columnWidths)
      );
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
