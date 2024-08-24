import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { GridsterComponent } from '../gridster/gridster.component';
import { PageComponent } from "../page/page.component";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, GridsterComponent, PageComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {
  @ViewChild(GridsterComponent) gridsterComponent!: GridsterComponent;
  saveChanges() {
    this.gridsterComponent.saveChanges();
  }
}
