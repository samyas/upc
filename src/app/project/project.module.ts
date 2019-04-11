import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './project.routes';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent, TaskComponent],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ],
  entryComponents: [
    TaskComponent
  ]
})
export class ProjectModule { }
