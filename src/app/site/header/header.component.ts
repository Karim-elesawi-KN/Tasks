import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  isEditMode = false;

  constructor(private pageService: PageService) {}

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.pageService.toggleEditMode();
  }
}
