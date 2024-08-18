import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageService } from './pages.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tsk1';

  constructor(
    private pageService: PageService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.pageService.loadPages();
      const landingPage = this.pageService.getLandingPage();
      if (landingPage) {
        // Redirect to the landing page if not already there
        if (this.router.url === '/') {
          this.router.navigate([landingPage]);
        }
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  }
}
