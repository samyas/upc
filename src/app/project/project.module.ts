import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';

import { projectsRouting } from './project.routes';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule, SharedModule, projectsRouting
  ]
})
export class ProjectModule { }
