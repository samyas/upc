import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';


export const ProjectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectComponent,
    data: {
      title: 'Projects'
    }
  }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(ProjectsRoutes);
