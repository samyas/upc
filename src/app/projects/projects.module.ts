import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './projects.routes';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { GoalComponent } from './goal/goal.component';
import { AddProjectComponent } from './project/add-project.component';
import { ApplyComponent } from './apply/apply.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent, AddProjectComponent,
    TaskComponent, GoalComponent, ApplyComponent ],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ],
  entryComponents: [TaskComponent, GoalComponent, ApplyComponent],
  providers : [ProjectService, PersonService]
})
export class ProjectsModule { }
