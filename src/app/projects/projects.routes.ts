import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project/add-project.component';


export const ProjectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      title: 'Projects'
    }
  },
  {
    path: 'add',
    component: AddProjectComponent,
    data: {
      title: 'Add Project'
    }
  },
  {
    path: 'edit/:id',
    component: AddProjectComponent,
    data: {
      title: 'Edit Project'
    }
  },
 /* {
    path: ':id',
    component: ProjectComponent,
    data: {
      title: 'Project'
    }
  },*/
  { path: ':id', loadChildren: () => import('../project/project.module').then(m => m.ProjectModule) }

];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(ProjectsRoutes);
