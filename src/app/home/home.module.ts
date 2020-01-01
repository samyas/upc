import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule, HomeRoutingModule
  ],
  declarations: [SidebarComponent, HeaderComponent, HomeComponent]
})
export class HomeModule { }
