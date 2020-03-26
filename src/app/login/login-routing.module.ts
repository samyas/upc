import { ActivateAccountComponent } from './activate-account.component';
import { InitOrganisationComponent } from './init-organisation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SelectOrganisationComponent } from './select-organisation.component';
import { AuthGuard } from '../core/guards/auth-guard';



@NgModule({
  imports: [RouterModule.forChild([
  {
    path: '',
    component: LoginComponent
  },
  {
   // canActivate: [AuthGuard],
    path: 'reset',
    component: ActivateAccountComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'choose-organisation',
    component: SelectOrganisationComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'init-organisation',
    component: InitOrganisationComponent
  }
  ])],
  exports: [RouterModule]
})

export class LoginRoutingModule {}
