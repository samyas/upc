import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './project.routes';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ]
})
export class ProjectModule { }
