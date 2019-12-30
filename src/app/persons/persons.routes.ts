import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person.component';
import { AddPersonComponent } from './add/add-person.component';



export const PersonsRoutes: Route[] = [
  {
    path: '',
    component: PersonsComponent,
    data: {
      title: 'Persons'
    }
  },
  {
    path: 'add',
    component: AddPersonComponent,
    data: {
      title: 'Person detail'
    }
  },
  {
    path: ':id',
    component: PersonComponent,
    data: {
      title: 'Person detail'
    }
  },
];

export const personsRouting: ModuleWithProviders = RouterModule.forChild(PersonsRoutes);
