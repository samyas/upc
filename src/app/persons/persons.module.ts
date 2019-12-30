import { AddPersonComponent } from './add/add-person.component';
import { PersonService } from './../core/services/person.service';
import { SelectBoxComponent } from './../shared/select-box/select-box.component';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person.component';
import { personsRouting } from './persons.routes';

@NgModule({
  declarations: [PersonsComponent, PersonComponent, AddPersonComponent],
  imports: [
    CommonModule, SharedModule, personsRouting
  ],
  providers : [PersonService]
})
export class PersonsModule { }
