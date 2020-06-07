import { SharedDataService } from './../../core/services/shared-data.service';
import { Action } from './../../core/model/organisation.model';
import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  serverError = '';

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder,
    public dataService: SharedDataService, public organisationService: OrganisationService) {
    }

    ngOnInit() {
      if (!this.action) {
        this.action = new Action();
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
        // stop here if form is invalid
        console.log('val', this.form.value);
        if (this.form.invalid) {
            return;
        }
        this.action = this.form.value;
        this.organisationService.addAction(this.dataService.organisationId, this.moduleId, this.action).subscribe(
         data => {
           console.log('add action', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add action', error);
           this.serverError = error.message;
         }
       );
    }

    update() {
      this.submitted = true;
      // stop here if form is invalid
      console.log('val', this.form.value);
      if (this.form.invalid) {
          return;
      }
      this.action = this.form.value;
      this.organisationService.updateAction(this.dataService.organisationId, this.moduleId, this.action).subscribe(
       data => {
         console.log('update action', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('update to update Goal', error);
         this.serverError = error.message;
       }
     );
    }

}
