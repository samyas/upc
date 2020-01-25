import { InitOrganisationComponent } from './init-organisation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SelectOrganisationComponent } from './select-organisation.component';



@NgModule({
  imports: [RouterModule.forChild([
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'choose-organisation',
    component: SelectOrganisationComponent
  },
  {
    path: 'init-organisation',
    component: InitOrganisationComponent
  }
  ])],
  exports: [RouterModule]
})

export class LoginRoutingModule {}
