import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

import { ProjectComponent } from './project.component';


export const ProjectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      title: 'Projects'
    }
  },
  {
    path: ':id',
    component: ProjectComponent,
    data: {
      title: 'Project'
    }
  }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(ProjectsRoutes);
