import { Component, Input } from '@angular/core';
import { EditModeService } from '../../services/edit-mode.service';
import { SiteComponent } from '../site.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() siteComponent!: SiteComponent;
  isEditMode = false;

  constructor(private editModeService: EditModeService) {}

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editModeService.toggleEditMode();

    if (!this.isEditMode) {
      this.siteComponent.saveChanges();
    }
  }
}
