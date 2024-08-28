import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget-user-list-model',
  standalone: true,
  imports: [],
  templateUrl: './widget-user-list-model.component.html',
  styleUrl: './widget-user-list-model.component.css',
})
export class WidgetUserListModelComponent {
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() description!: string;
}
