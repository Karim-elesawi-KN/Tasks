import {
  ApplicationConfig,
  APP_INITIALIZER,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { PageService } from './services/page.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export function loadPagesFactory(pageService: PageService) {
  return () =>
    pageService.loadPages().catch((err) => {
      console.error('Error loading pages:', err);
      return Promise.reject(err);
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideMomentDateAdapter(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(MatNativeDateModule),
    {
      provide: APP_INITIALIZER,
      useFactory: loadPagesFactory,
      deps: [PageService],
      multi: true,
    },
    provideAnimationsAsync('noop'),
    provideAnimationsAsync('noop'),
  ],
};
