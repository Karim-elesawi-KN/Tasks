import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { PageService } from './pages.service';

export function loadPagesFactory(pageService: PageService) {
  return () => pageService.loadPages().catch(err => {
    console.error('Error loading pages:', err);
    return Promise.reject(err);
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: loadPagesFactory,
      deps: [PageService],
      multi: true
    }
  ]
};
