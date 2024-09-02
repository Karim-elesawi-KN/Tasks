import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageService } from './services/page.service';
import { SiteComponent } from './site/site.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private pageService: PageService, private router: Router) {}

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