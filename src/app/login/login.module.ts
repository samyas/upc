import { AuthService } from './../core/services/auth.service';
import { SelectOrganisationComponent } from './select-organisation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, LoginRoutingModule, SharedModule
  ],
  declarations: [LoginComponent, SelectOrganisationComponent],
  providers: [ AuthService ]
})
export class LoginModule { }
