import { FileDescriptor } from './../../core/model/file-descriptor.model';
import { FileUploaderService } from './../../core/services/file-uploader.service';
import { SharedDataService } from './../../core/services/shared-data.service';
import { Action } from './../../core/model/organisation.model';
import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganisationService } from 'src/app/core/services/organisation.service';
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {

  @Input() public action: Action;
  public form: FormGroup;
  @Input() public moduleId;

  public Editor = ClassicEditor;

  submitted = false;
  error = null;

  files:  Array<any> = [];
  uploadedFilesUrls:  Array<string> = [];
  fileDescriptors: Array<FileDescriptor> = [];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder,
    public dataService: SharedDataService, public uploadService: FileUploaderService,
     public organisationService: OrganisationService) {
    }

    ngOnInit() {
      if (!this.action) {
        this.action = new Action();
        this.action.attachmentList = [];
      }
      this.form = this.fb.group({
        actionId: this.action.actionId,
        order: [this.action.order, Validators.compose([Validators.required])],
        name: [this.action.name, Validators.compose([Validators.required, Validators.minLength(5)])],
        description: [this.action.description, Validators.compose([Validators.required, Validators.minLength(6)])],
        startDate: this.action.startDate,
        endDate:  this.action.endDate,
        weekNbr: this.action.weekNbr,
        beforeStart: this.action.beforeStart

    });
    }

    get f() { return this.form.controls; }

    create() {
        this.submitted = true;
        this.error = null;
        // stop here if form is invalid
        console.log('val', this.form.value);
        if (this.form.invalid) {
            return;
        }
        const attachmentList = this.action.attachmentList;
        this.action = this.form.value;
        this.action.attachmentList = attachmentList;
        this.organisationService.addAction(this.dataService.organisationId, this.moduleId, this.action).subscribe(
         data => {
           console.log('add action', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add action', error);
           this.error = error.message;
         }
       );
    }

    update() {
      this.submitted = true;
      this.error = null;
      // stop here if form is invalid
      console.log('val', this.form.value);
      if (this.form.invalid) {
          return;
      }
      const attachmentList = this.action.attachmentList;
      this.action = this.form.value;
      this.action.attachmentList = attachmentList;
      this.organisationService.updateAction(this.dataService.organisationId, this.moduleId, this.action).subscribe(
       data => {
         console.log('update action', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('update to update Goal', error);
         this.error = error.message;
       }
     );
    }

    removeAttachement(url: string) {
      this.action.attachmentList = this.action.attachmentList.filter(x => x.url !== url);
    }

    uploadFileTask(event) {
      this.error = null;
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
      //  this.files.push(element);
        this.uploadService.uploadFile(element, element.name,  this.moduleId , 'MODULE')
        .subscribe( data => {
          console.log('data', data);
             if (data) {
            //  if (data.status) {
             // console.log('progress', data.status, data.message);
            //  } else {
                const fileDescriptor = new FileDescriptor();
                fileDescriptor.fileName = element.name;
                fileDescriptor.url = data;
                this.action.attachmentList.push(fileDescriptor);
                // this.uploadedFilesUrls.push(url);
                console.log('attach success', this.action.attachmentList);
              // }
             }

        },
        error => {
          console.log(error);
          this.error = error.message;
        });
      }
    }




}
