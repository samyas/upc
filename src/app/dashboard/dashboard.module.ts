import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import { LeaderDashboardComponent } from './leader-dashboard.component';
import { ProjectService } from '../core/services/project.service';
import { PersonService } from '../core/services/person.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule, SharedModule, ChartsModule, DashboardRoutingModule
  ],
  declarations: [SupervisorDashboardComponent, LeaderDashboardComponent],
  providers: [ ProjectService, PersonService ]
})
export class DashboardModule { }
