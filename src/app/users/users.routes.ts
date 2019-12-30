import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';




export const UsersRoutes: Route[] = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
];

export const usersRouting: ModuleWithProviders = RouterModule.forChild(UsersRoutes);
