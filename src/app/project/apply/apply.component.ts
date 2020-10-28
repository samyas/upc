import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';

import { Apply } from '../../core/model/project.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Term } from 'src/app/core/model/organisation.model';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  @Input() public apply: Apply;

  public form: FormGroup;
  @Input() public projectId;

  @Input() public terms: Array<Term> = [];

  public Editor = ClassicEditor;

  files: Array<any> = [];
  submitted = false;
  serverError = null;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public projectService: ProjectService) {
    }

    ngOnInit() {
      if (!this.apply) {
        this.apply = new Apply();
      }
      console.log('dfdsf', this.terms);
      if (this.terms.length > 0 ) {
        this.form = this.fb.group({
          termId: [this.apply.termId, Validators.compose([Validators.required])],
          description: [this.apply.description, Validators.compose([Validators.required, Validators.minLength(6)])],
      });
      } else {
        this.form = this.fb.group({
          description: [this.apply.description, Validators.compose([Validators.required, Validators.minLength(6)])],
      });
      }

    }

    get f() { return this.form.controls; }

    create() {
        this.submitted = true;
        // stop here if form is invalid
        console.log('val', this.form.value);
        if (this.form.invalid) {
            return;
        }
        this.apply = this.form.value;
        this.projectService.apply(this.projectId, this.apply, this.files).subscribe(
         data => {
           console.log('add Apply', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add apply', error);
           this.serverError = error.message;
         }
       );
    }

    uploadFile(event) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.files.push(element);
      }
    }
    removeFile(name) {
        this.files = this.files.filter(f => f.name !== name);
    }

}
