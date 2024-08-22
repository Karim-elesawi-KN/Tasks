import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PageService } from './services/pages.service';
import { SiteComponent } from "./site/site.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private pageService: PageService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.pageService.loadPages();
      const landingPage = this.pageService.getLandingPage();
      if (landingPage) {
        if (this.router.url === '/') {
          this.router.navigate([landingPage]);
        }
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  }
}
