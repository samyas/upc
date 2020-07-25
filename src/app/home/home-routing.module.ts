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
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),

      },
      {
        path: 'modules',
        loadChildren: () => import('../organisation/organisation.module').then(m => m.OrganisationModule),
      },
      {
        path: 'organisation',
        loadChildren: () => import('../organisation/organisation.module').then(m => m.OrganisationModule),
      },
      {
        path: 'project',
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'staff',
        loadChildren: () => import('../persons/persons.module').then(m => m.PersonsModule),
        data: {
          type: 'STAFF'
        }
      },
      {
        path: 'students',
        loadChildren: () => import('../persons/persons.module').then(m => m.PersonsModule),
        data: {
          type: 'STUDENT'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
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
