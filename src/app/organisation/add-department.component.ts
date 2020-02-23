import { ShortPerson } from './../core/model/short-person.model';
import { Person } from './../core/model/person.model';


import { OrganisationService } from '../core/services/organisation.service';
import { Department, ModuleType, MODULES_TYPE, SUB_MODULES_TYPE, SubModuleType } from '../core/model/organisation.model';

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

   public form: FormGroup;
   submitted = false;
   serverError = '';
   moduleTypes: Array<ModuleType> = MODULES_TYPE;
   subModuleTypes: Array<SubModuleType> = SUB_MODULES_TYPE;
 //  persons: Array<Person> = [];

  constructor(public activeModal: NgbActiveModal,  private  personService: PersonService,
    public organisationService: OrganisationService, public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    //  responsable: ['', Validators.required],
      type: ['', Validators.required],
      code: ['', Validators.required],
      subType: null
  });

   }
  ngOnInit() {
    console.log('org', this.organisationId);
   // this.loadPersonData();
  }

  // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

/* loadPersonData() {
  this.personService.getPersons().subscribe(
    data => {
      this.persons =  data;
      console.log('ssss', this.persons);
    }
    , error => alert(error)
  );
}*/

/*onSelectResponsible($event) {
  console.log('responsible selected', $event.id);
  console.log('test');
  const assignment:  Assign = new Assign();
  assignment.personId = $event.id;
  assignment.action = 'ADD';
  assignment.position = 'SUPERVISOR';
 // this.assign(this.project.projectId, assignment);
}*/

isDissertation(moduleType: ModuleType): boolean {
  return ModuleType.DISSERTATION === moduleType;
}


 create() {
     this.submitted = true;
     // stop here if form is invalid
     console.log('val', this.form.value);
     if (this.form.invalid) {
         return;
     }
     // const person = new ShortPerson();
     // person.personId = this.form.value.responsable;
     // const department: Department = this.form.value;
    // department.responsible = person;

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
