import { Component } from '@angular/core';
import { EditModeService } from '../../services/edit-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private editModeService: EditModeService) {}

  toggleEditMode() {  
    this.editModeService.toggleEditMode();
  }
}
