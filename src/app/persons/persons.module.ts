
import { AddPersonComponent } from './add/add-person.component';
import { PersonService } from './../core/services/person.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person.component';
import { OrganisationService } from '../core/services/organisation.service';
import { PersonsRoutingModule } from './persons-routing.module';
import { FileUploaderService } from '../core/services/file-uploader.service';

@NgModule({
  imports: [
    CommonModule, SharedModule, PersonsRoutingModule
  ],
  entryComponents: [AddPersonComponent],
  declarations: [PersonsComponent, PersonComponent, AddPersonComponent],
  providers : [PersonService, OrganisationService, FileUploaderService]
})
export class PersonsModule { }
