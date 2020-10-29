
import { ShortPerson } from './../core/model/short-person.model';
import { Person } from './../core/model/person.model';


import { OrganisationService } from '../core/services/organisation.service';
import { Module, ModuleType, MODULES_TYPE, SUB_MODULES_TYPE, SubModuleType } from '../core/model/organisation.model';

import {Component, OnInit, Input} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from '../core/services/person.service';
import { Assign } from '../core/model/assign.model';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  @Input() public organisationId;
  @Input() public department: Module = new Module();


   public form: FormGroup;
   submitted = false;
   serverError = '';
   moduleTypes: Array<ModuleType> = MODULES_TYPE;
   subModuleTypes: Array<SubModuleType> = SUB_MODULES_TYPE;

  constructor(public activeModal: NgbActiveModal,  private  personService: PersonService,
    public organisationService: OrganisationService, public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [this.department.name, Validators.required],
      description: [this.department.description, Validators.required],
      type: [this.department.type, Validators.required],
      code: [this.department.code, Validators.required],
      subType: null
  });

   }
  ngOnInit() {
    console.log('org', this.organisationId);
  }

  // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

haveASubType(moduleType: ModuleType): boolean {
  return  moduleType && ModuleType.PHD !== moduleType;
}


 create() {
     this.submitted = true;
     // stop here if form is invalid
     console.log('val', this.form.value);
     if (this.form.invalid) {
         return;
     }

    this.organisationService.addDepartment(this.organisationId,  this.form.value).subscribe(
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
