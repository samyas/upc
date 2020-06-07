import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganisationService } from '../core/services/organisation.service';
import { SharedDataService } from '../core/services/shared-data.service';


@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule,  HomeRoutingModule, NgSelectModule
  ],
  declarations: [SidebarComponent, HeaderComponent, HomeComponent],
  providers: [ OrganisationService,  SharedDataService ]
})
export class HomeModule { }
