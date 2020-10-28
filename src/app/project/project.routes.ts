import { AppliesComponent } from './apply/applies.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ProjectComponent } from './project.component';
import { ProjectOverviewComponent } from './overview/project-overview.component';
import { GoalsComponent } from './../project/goal/goals.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([

  {
    path: '',
    component: ProjectComponent,
    data: {
      title: 'Home'
    },

    children: [
      {
        path: '',
        component: ProjectOverviewComponent,
        data: {num: 1}
      },
      {
        path: 'overview',
        component: ProjectOverviewComponent,
        data: {num: 1}
      },
      {
        path: 'goals',
        component: GoalsComponent
     // ,   data: {num: 2}
      },
      {
        path: 'kanboard',
        component: KanbanComponent,
        data: {num: 3}
      },
      {
        path: 'applies',
        component: AppliesComponent,
        data: {num: 4}
      },
      {
        path: 'administration',
        component: GoalsComponent,
        data: {num: 5}
      },

    ]
  }
  ])],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
