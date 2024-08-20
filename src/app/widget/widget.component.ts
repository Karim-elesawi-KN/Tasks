import { Component } from '@angular/core';
import { WidgetUserListComponent } from './widget-user-list/widget-user-list.component';
import { WidgetToDoListComponent } from './widget-to-do-list/widget-to-do-list.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [WidgetUserListComponent, WidgetToDoListComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {

}
