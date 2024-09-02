import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatCheckboxModule,
  MatCheckboxChange,
} from '@angular/material/checkbox';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-widget-users-mat-table',
  standalone: true,
  imports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  templateUrl: './widget-users-mat-table.component.html',
  styleUrls: ['./widget-users-mat-table.component.scss'],
})
export class WidgetUsersMatTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ID', 'name', 'country', 'age'];
  dataSource = new MatTableDataSource<any>([]); 

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new Set<any>();

  constructor(private widgetService: WidgetService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    await this.widgetService.loadUsers();
    this.dataSource = new MatTableDataSource(this.widgetService.getUsers());
    this.dataSource.sort = this.sort; // Ensure sort is assigned after data is loaded
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleAllSelection(event: MatCheckboxChange) {
    if (event.checked) {
      this.dataSource.data.forEach((user: any) => this.selection.add(user));
    } else {
      this.selection.clear();                 
    }
  }

  isAllSelected(): boolean {
    return (
      this.dataSource.data.length > 0 &&
      this.dataSource.data.every((user: any) => this.selection.has(user))
    );
  }

  isSomeSelected(): boolean {
    return this.selection.size > 0 && !this.isAllSelected();
  }

  onRowCheckboxChange(event: MatCheckboxChange, user: any) {
    if (event.checked) {
      this.selection.add(user);
    } else {
      this.selection.delete(user);
    }
  }
}