

import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import { LeaderDashboardComponent } from './leader-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [RouterModule.forChild([
     {
    path: '',
    component: SupervisorDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: '',
    component: LeaderDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },

  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
