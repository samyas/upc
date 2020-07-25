import { FilesComponent } from './files/files.component';
import { AddTermComponent } from './configration/add-term.component';
import { SharedDataService } from './../core/services/shared-data.service';
import { ModuleRoutingModule } from './module.routes';
import { ConfigurationComponent } from './configration/configuration.component';
import { ActionsComponent } from './action/actions.component';
import { ModuleComponent } from './module.component';
import { AddActionComponent } from './action/add-action.component';

import { UploadFileComponent } from './../shared/file-upload/upload-file.component';

import { FileUploaderService } from './../core/services/file-uploader.service';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { OrganisationService } from './../core/services/organisation.service';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import {
  NgbDateAdapter,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/config/datepicker-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropDirective } from '../shared/file-upload/drag-drop.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModuleOverviewComponent } from './overview/module-overview.component';


@NgModule({
  declarations: [ModuleComponent,
    AddActionComponent, ActionsComponent, AddTermComponent,
     ModuleOverviewComponent, ConfigurationComponent, FilesComponent],
  imports: [
    CommonModule, SharedModule, ModuleRoutingModule, NgSelectModule, CKEditorModule
  ],
  entryComponents: [AddActionComponent, AddTermComponent],
  providers : [ProjectService, PersonService, OrganisationService, FileDownloadService, FileUploaderService,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ModuleModule { }
