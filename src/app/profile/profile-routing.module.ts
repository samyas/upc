import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';


@NgModule({
  imports: [RouterModule.forChild([
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Profile'
    }
  },

  ])],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
