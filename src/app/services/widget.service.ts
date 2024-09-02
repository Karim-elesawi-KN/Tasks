import { Injectable, Type } from '@angular/core';
import { WidgetUserListComponent } from '../widget/widget-user-list/widget-user-list.component';
import { WidgetToDoListComponent } from '../widget/widget-to-do-list/widget-to-do-list.component';
import { WidgetUsersMatTableComponent } from '../widget/widget-users-mat-table/widget-users-mat-table.component';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetMap: { [key: string]: Type<any> } = {
    'widget-user-list': WidgetUserListComponent,
    'widget-to-do-list': WidgetToDoListComponent,
    'widget-users-mat-table': WidgetUsersMatTableComponent,
  };


  getComponent(widgetContext: string): Type<any> | null {
    return this.widgetMap[widgetContext] || null;
  }

  private users: any[] = [];
  private usersLoaded = false; 

  async loadUsers(): Promise<void> {
    if (this.usersLoaded) return; 

    const response = await fetch('/assets/users.json');
    const data = await response.json();
    this.users = data.users;
    this.usersLoaded = true; 
  }

  getUsersById(id: string) {
    return this.users.find(user => user.ID === id);
  }

  getUsers() {
    return this.users;
  }

}