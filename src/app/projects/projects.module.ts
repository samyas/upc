import { OrganisationService } from './../core/services/organisation.service';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './projects.routes';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { AddGoalComponent } from './goal/add-goal.component';
import { AddProjectComponent } from './project/add-project.component';
import { ApplyComponent } from './apply/apply.component';
import { ShortTaskComponent } from './task/short-task.component';
import {
  NgbDateAdapter,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/config/datepicker-adapter';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent, AddProjectComponent,
    TaskComponent, AddGoalComponent, ApplyComponent, ShortTaskComponent ],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ],
  entryComponents: [TaskComponent, AddGoalComponent, ApplyComponent, ShortTaskComponent],
  providers : [ProjectService, PersonService, OrganisationService,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProjectsModule { }
