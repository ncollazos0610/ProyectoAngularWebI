import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
 providers: [
    provideRouter(routes),
    importProvidersFrom(CommonModule)
  ]
})
  .catch(err => console.error(err));
