import { AuthService } from './core/services/auth.service';
// import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppSettings } from './core/app.settings';
import { AuthInterceptor } from './core/http/auth-interceptor';
import { ErrorInterceptor } from './core/http/error-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ,
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    RouterModule, AppRoutingModule,
     HttpClientModule
  ],
  providers: [   AppSettings, AuthService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
