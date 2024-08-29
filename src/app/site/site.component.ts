import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GridsterComponent } from '../gridster/gridster.component';
import { CommonModule } from '@angular/common';
import { EditModeService } from '../services/edit-mode.service';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    GridsterComponent,
    CommonModule,
    SettingsMenuComponent,
    RouterLinkActive,
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css',
})
export class SiteComponent {
  @ViewChild(GridsterComponent) gridsterComponent!: GridsterComponent;
  constructor(private editModeService: EditModeService) {}
  isSettingMode = false;

  onMenuToggle(isOpen: boolean) {
    this.isSettingMode = isOpen;
  }

  saveChanges() {
    this.gridsterComponent.saveChanges();
  }
}
