import { SharedDataService } from '../../core/services/shared-data.service';
import { Term } from '../../core/model/organisation.model';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganisationService } from 'src/app/core/services/organisation.service';
@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.scss']
})
export class AddTermComponent implements OnInit {

  @Input() public term: Term;
  public form: FormGroup;
  @Input() public moduleId;

  public Editor = ClassicEditor;

  submitted = false;
  serverError = '';

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder,
    public dataService: SharedDataService, public organisationService: OrganisationService) {
    }

    ngOnInit() {
      if (!this.term) {
        this.term = new Term();
      }
      this.form = this.fb.group({
        termId: this.term.termId,
        order: [this.term.order, Validators.compose([Validators.required])],
        name: [this.term.name, Validators.compose([Validators.required, Validators.minLength(5)])],
        quota:  [this.term.quota, Validators.compose([Validators.required])],
        description: [this.term.description, Validators.compose([Validators.required, Validators.minLength(6)])],
        mandatoryBeforeStart: this.term.mandatoryBeforeStart

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
        this.term = this.form.value;
        this.organisationService.addTerm(this.dataService.organisationId, this.moduleId, this.term).subscribe(
         data => {
           console.log('add term', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add term', error);
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
      this.term = this.form.value;
      this.organisationService.updateTerm(this.dataService.organisationId, this.moduleId, this.term).subscribe(
       data => {
         console.log('update term', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('update to update term', error);
         this.serverError = error.message;
       }
     );
    }

}
