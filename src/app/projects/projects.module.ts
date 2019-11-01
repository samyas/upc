import { PersonService } from './../core/services/person.service';
import { SelectBoxComponent } from './../shared/select-box/select-box.component';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './projects.routes';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { GoalComponent } from './goal/goal.component';
import { AssignComponent } from '../shared/select-box/assign.component';
import { AddProjectComponent } from './project/add-project.component';
import { ApplyComponent } from './apply/apply.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent, AddProjectComponent,
    TaskComponent, GoalComponent, SelectBoxComponent, AssignComponent, ApplyComponent ],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ],
  entryComponents: [TaskComponent, GoalComponent, SelectBoxComponent, AssignComponent, ApplyComponent],
  providers : [ProjectService, PersonService]
})
export class ProjectsModule { }
