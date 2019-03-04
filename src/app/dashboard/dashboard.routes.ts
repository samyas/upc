import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';


export const DashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(DashboardRoutes);
