import { PersonComponent } from './person.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PersonsComponent } from './persons.component';


@NgModule({
  imports: [RouterModule.forChild([
  {
    path: '',
    component: PersonsComponent,
  },
  {
    path: ':id',
    component: PersonComponent,
    data: {
      title: 'Person detail'
    }
  },

  ])],
  exports: [RouterModule]
})
export class PersonsRoutingModule {}
