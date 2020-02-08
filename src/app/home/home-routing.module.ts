import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/guards/auth-guard';
// import { ErrorComponent } from './../shared/errors/error.component';
// import { AuthGuard } from './../core/auth';


@NgModule({
  imports: [RouterModule.forChild([

  {
    path: '',
     canActivate: [AuthGuard],
    component: HomeComponent,
    data: {
      title: 'Home'
    },

    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule',

      },
      {
        path: 'organisation',
        loadChildren: '../organisation/organisation.module#OrganisationModule',
      },
      {
        path: 'project',
        loadChildren: '../projects/projects.module#ProjectsModule',
      },
      {
        path: 'persons',
        loadChildren: '../persons/persons.module#PersonsModule',
      },
      {
        path: 'users',
        loadChildren: '../users/users.module#UsersModule',
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
     /* {
        path: 'candidates',
        loadChildren: '../condidates/condidates.module#CondidatesModule',
         data: {
            title: 'Candidates'
          }
      },
      {
        path: 'companies',
        loadChildren: '../companies/companies.module#CompaniesModule',
         data: {
            title: 'Companies'
          }
      },

      {
        path: 'emails',
        loadChildren: '../emails/emails.module#EmailsModule',
         data: {
            title: 'Emails Template'
          }
      },

      {
        path: 'users',
        loadChildren: '../users/users.module#UsersModule',
         data: {
            title: 'Users'
          }
      },
       { path: 'system-error', pathMatch: 'full',  component: ErrorComponent, data: { title: 'System error'},  },
       { path: 'access-denied', pathMatch: 'full',  component: ErrorComponent, data: { title: 'Access Denied', msg: 'Access denied'},  },*/

    ]
  }
  ])],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
