import { ActivateAccountComponent } from './activate-account.component';
import { InitOrganisationComponent } from './init-organisation.component';
import { AuthService } from './../core/services/auth.service';
import { SelectOrganisationComponent } from './select-organisation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { OrganisationService } from '../core/services/organisation.service';

@NgModule({
  imports: [
    CommonModule, RouterModule, LoginRoutingModule, SharedModule
  ],
  declarations: [LoginComponent, SelectOrganisationComponent, InitOrganisationComponent, ActivateAccountComponent],
  providers: [ AuthService, OrganisationService ]
})
export class LoginModule { }
