
import { OrganisationService } from '../core/services/organisation.service';
import { Department } from '../core/model/organisation.model';

import {Component, OnInit, Input} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  @Input() public organisationId;

   public form: FormGroup;
   submitted = false;
   serverError = '';

  constructor(public activeModal: NgbActiveModal, public organisationService: OrganisationService, public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
  });

   }
  ngOnInit() {
    console.log('org', this.organisationId);
  }

  // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

 create() {
     this.submitted = true;
     // stop here if form is invalid
     console.log('val', this.form.value);
     if (this.form.invalid) {
         return;
     }
     const department: Department = this.form.value;
     this.organisationService.addDepartment(this.organisationId, department).subscribe(
      data => {
        console.log('add departmentData', data);
        this.activeModal.close();
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
 }
}
