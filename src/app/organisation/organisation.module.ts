import { OrganisationService } from './../core/services/organisation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import {SharedModule} from '../shared/shared.module';
import { AddDepartmentComponent } from './add-department.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, OrganisationRoutingModule
  ],
  entryComponents: [AddDepartmentComponent],
  declarations: [OrganisationComponent, AddDepartmentComponent],
  providers: [ OrganisationService ]
})
export class OrganisationModule { }
