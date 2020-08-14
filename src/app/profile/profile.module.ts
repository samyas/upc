import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PersonService } from '../core/services/person.service';
import { OrganisationService } from '../core/services/organisation.service';
import { FileUploaderService } from '../core/services/file-uploader.service';

@NgModule({

  imports: [
    CommonModule, SharedModule, ProfileRoutingModule
  ],
  declarations: [ProfileComponent],
  providers : [PersonService, OrganisationService, FileUploaderService]
})
export class ProfileModule { }
