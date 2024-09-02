import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/page.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  pages: any[] = [];
  constructor(private pageService: PageService) {}
  async ngOnInit() {
    await this.pageService.loadPages();
    this.pages = this.pageService.getPages();
  }
}
