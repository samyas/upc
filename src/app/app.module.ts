// import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AppSettings } from './core/app.settings';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    RouterModule, AppRoutingModule,
    OverlayModule
  ],
  providers: [   AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
