import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css',
})
export class SettingsMenuComponent {
  @Input() isSettingMode = false;
  @Output() menuToggle = new EventEmitter<boolean>();
  circleColors = [
    '#ff5b57',
    '#fb5597',
    '#f59c1a',
    '#ffd900',
    '#90ca4b',
    '#32a932',
    '#00acac',
    '#348fe2',
    '#727cb6',
    '#8753de',
    '#6c757d',
  ];

  constructor(private renderer: Renderer2) {}

  toggleSetting() {
    this.isSettingMode = !this.isSettingMode;
    console.log('Setting mode toggled:', this.isSettingMode);
    this.menuToggle.emit(this.isSettingMode);
  }

  changeThirdColor(color: string) {
    document.documentElement.style.setProperty('--third-color', color);
  }

  toggleDarkMode(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}