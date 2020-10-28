import { AppliesComponent } from './apply/applies.component';
import { KanbanComponent } from './kanban/kanban.component';
import { GoalsComponent } from './goal/goals.component';
import { UploadFileComponent } from './../shared/file-upload/upload-file.component';

import { FileUploaderService } from './../core/services/file-uploader.service';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { OrganisationService } from './../core/services/organisation.service';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { AddTaskComponent } from './task/add-task.component';
import { AddGoalComponent } from './goal/add-goal.component';
import { ApplyComponent } from './apply/apply.component';
import { ShortTaskComponent } from './task/short-task.component';
import {
  NgbDateAdapter,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/config/datepicker-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropDirective } from '../shared/file-upload/drag-drop.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TaskComponent } from './task/task.component';
import { ProjectOverviewComponent } from './overview/project-overview.component';
import { ProjectRoutingModule } from './project.routes';
import { AssignPersonsComponent } from './assign/assign-persons.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ProjectComponent,
    AddTaskComponent, AddGoalComponent, ApplyComponent, AppliesComponent, ShortTaskComponent, TaskComponent, AssignPersonsComponent,
     ProjectOverviewComponent, GoalsComponent, KanbanComponent],
  imports: [
    CommonModule, SharedModule, ProjectRoutingModule, NgSelectModule, CKEditorModule, DragDropModule
  ],
  entryComponents: [AddTaskComponent, AddGoalComponent, ApplyComponent, ShortTaskComponent, AssignPersonsComponent],
  providers : [ProjectService, PersonService, OrganisationService, FileDownloadService, FileUploaderService,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProjectModule { }
