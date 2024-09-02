import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { PageComponent } from './page/page.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    PageComponent,
    SettingsMenuComponent,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css',
})
export class SiteComponent {
  isSettingMode = false;

  onMenuToggle(isOpen: boolean) {
    console.log('Menu toggle triggered:', isOpen);
    this.isSettingMode = isOpen;
  }
}
