import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrganisationComponent } from './organisation.component';


@NgModule({
  imports: [RouterModule.forChild([
     {
    path: '',
    component: OrganisationComponent,
  },
  { path: ':id', loadChildren: () => import('../module/module.module').then(m => m.ModuleModule) }

  ])],
  exports: [RouterModule]
})
export class OrganisationRoutingModule {}
