import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatCheckboxModule,
  MatCheckboxChange,
} from '@angular/material/checkbox';
import { WidgetService } from '../../services/widget.service';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
})
export class WidgetUsersMatTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'ID', 'name', 'country', 'age'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new Set<any>();
  private filterSubject: Subject<void> = new Subject<void>();

  constructor(private widgetService: WidgetService) {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  async loadUserData(): Promise<void> {
    await this.widgetService.loadUsers();
    const users = this.widgetService.getUsers();
    this.dataSource.data = users;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  @Input() isFilterMode = false;
  @Output() filterToggle = new EventEmitter<boolean>();
  filterValues: any = {
    ID: '',
    name: '',
    country: '',
    age: '',
  };
  toggleFilter() {
    this.isFilterMode = !this.isFilterMode;
    if (!this.isFilterMode) {
      this.filterValues = {
        ID: '',
        name: '',
        country: '',
        age: '',
      };
      this.dataSource.filter = '';
    }
  }
  applyFilter(column: string, event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.filterValues[column] = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  customFilterPredicate(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const filterObject = JSON.parse(filter);
      const matchesID = data.ID.toLowerCase().includes(
        filterObject.ID.toLowerCase()
      );
      const matchesName = data.name
        .toLowerCase()
        .includes(filterObject.name.toLowerCase());
      const matchesCountry = data.country
        .toLowerCase()
        .includes(filterObject.country.toLowerCase());
      const matchesAge = data.age.toString().includes(filterObject.age);

      return (
        (!filterObject.ID || matchesID) &&
        (!filterObject.name || matchesName) &&
        (!filterObject.country || matchesCountry) &&
        (!filterObject.age || matchesAge)
      );
    };
  }
}
