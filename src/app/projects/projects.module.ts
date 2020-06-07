import { UploadFileComponent } from './../shared/file-upload/upload-file.component';

import { FileUploaderService } from './../core/services/file-uploader.service';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { OrganisationService } from './../core/services/organisation.service';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { projectsRouting } from './projects.routes';

import { SharedModule } from '../shared/shared.module';

import {
  NgbDateAdapter,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/config/datepicker-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropDirective } from '../shared/file-upload/drag-drop.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddProjectComponent } from './add-project/add-project.component';


@NgModule({
  declarations: [AddProjectComponent, ProjectsComponent, UploadFileComponent, DragDropDirective],
  imports: [
    CommonModule, SharedModule, projectsRouting, NgSelectModule, CKEditorModule
  ],
  providers : [ProjectService, PersonService, OrganisationService, FileDownloadService, FileUploaderService,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProjectsModule { }
