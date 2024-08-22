import { Injectable, Type } from '@angular/core';
import { WidgetUserListComponent } from '../widget/widget-user-list/widget-user-list.component';
import { WidgetTodoListComponent } from '../widget/widget-to-do-list/widget-to-do-list.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetMap: { [key: string]: Type<any> } = {
    'widget-user-list': WidgetUserListComponent,
    'widget-to-do-list': WidgetTodoListComponent,
  };

  getComponent(widgetContext: string): Type<any> | null {
    return this.widgetMap[widgetContext] || null;
  }

}
