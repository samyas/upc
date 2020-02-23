import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PersonsComponent } from './persons.component';


@NgModule({
  imports: [RouterModule.forChild([
     {
    path: '',
    component: PersonsComponent,
  }

  ])],
  exports: [RouterModule]
})
export class PersonsRoutingModule {}
