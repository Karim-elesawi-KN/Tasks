import { Routes } from '@angular/router';
import { PageService } from './pages.service';
import { PageComponent } from './page/page.component';

export function getLandingPage(pageService: PageService): string {
  return pageService.getLandingPage();
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: '', 
    pathMatch: 'full'
  },
  { path: ':id', component: PageComponent },
];
