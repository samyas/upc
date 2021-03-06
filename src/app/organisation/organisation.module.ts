import { SharedDataService } from './../core/services/shared-data.service';
import { OrganisationService } from './../core/services/organisation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import {SharedModule} from '../shared/shared.module';
import { AddDepartmentComponent } from './add-department.component';
import { PersonService } from '../core/services/person.service';
import { FileUploaderService } from '../core/services/file-uploader.service';

@NgModule({
  imports: [
    CommonModule, SharedModule, OrganisationRoutingModule
  ],
  entryComponents: [AddDepartmentComponent],
  declarations: [OrganisationComponent, AddDepartmentComponent],
  providers: [ OrganisationService, PersonService, FileUploaderService ]
})
export class OrganisationModule { }
