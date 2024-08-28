import { Component } from '@angular/core';
import { WidgetUserListModelComponent } from './widget-user-list-model/widget-user-list-model.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-widget-user-list',
  templateUrl: './widget-user-list.component.html',
  styleUrl: './widget-user-list.component.css',
  imports: [WidgetUserListModelComponent, CommonModule],
})
export class WidgetUserListComponent {
  users = [
    { imgSrc: '../assets/img/user-1.jpg', title: 'Christopher Struth', description: 'Bank Transfer' },
    { imgSrc: '../assets/img/user-1.jpg', title: 'Jessica Pearson', description: 'Credit Card' },
    { imgSrc: '../assets/img/user-1.jpg', title: 'Harvey Specter', description: 'Wire Transfer' },
  ];
}
