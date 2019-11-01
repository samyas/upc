import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { dashboardRouting } from './dashboard.routes';
import { SharedModule } from '../shared/shared.module';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import { LeaderDashboardComponent } from './leader-dashboard.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, dashboardRouting
  ],
  declarations: [SupervisorDashboardComponent, LeaderDashboardComponent]
})
export class DashboardModule { }
