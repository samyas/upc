
import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import { LeaderDashboardComponent } from './leader-dashboard.component';


export const DashboardRoutes: Route[] = [
  {
    path: 'supervisor',
    component: SupervisorDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },

  {
    path: 'leader',
    component: LeaderDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(DashboardRoutes);
