import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageService } from '../../services/pages.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  pages: any[] = [];

  constructor(private pageService: PageService) {}

  async ngOnInit() {
    await this.pageService.loadPages();
    this.pages = this.pageService.getPages();
  }
}
