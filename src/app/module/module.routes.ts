import { ConfigurationComponent } from './configration/configuration.component';
import { ModuleOverviewComponent } from './overview/module-overview.component';
import { ModuleComponent } from './module.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './action/actions.component';


@NgModule({
  imports: [RouterModule.forChild([

  {
    path: '',
    component: ModuleComponent,
    data: {
      title: 'Home'
    },

    children: [
      {
        path: '',
        component: ModuleOverviewComponent,
        data: {num: 1}
      },
      {
        path: 'overview',
        component: ModuleOverviewComponent,
        data: {num: 1}
      },
      {
        path: 'actions',
        component: ActionsComponent
      ,   data: {num: 2}
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
        data: {num: 3}
      }

    ]
  }
  ])],
  exports: [RouterModule]
})
export class ModuleRoutingModule {}
