import { Routes } from '@angular/router';
import { PageService } from './services/page.service';
import { PageComponent } from './site/page/page.component';

export function getLandingPage(pageService: PageService): string {
  return pageService.getLandingPage();
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: getLandingPage(new PageService()),
    pathMatch: 'full',
  },
  { path: ':pageContext', component: PageComponent },
];
