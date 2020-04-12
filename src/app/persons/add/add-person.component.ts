import { Department } from './../../core/model/organisation.model';
import { PersonService } from './../../core/services/person.service';
import { startWith } from 'rxjs/operators';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Person, PersonFunction } from 'src/app/core/model/person.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  public form: FormGroup;
  @Input() public person: Person;
  submitted = false;
  serverError = null;

  @Input()  departments: Array<Department> = [];


  constructor(public activeModal: NgbActiveModal,
    public fb: FormBuilder, public personService: PersonService) {

    }

    ngOnInit() {
      console.log('departementsssssss', this.departments);
      let departmentId = null;
      if (this.departments && this.departments.length === 1) {
         departmentId = this.departments[0].id;
      }
      if (!this.person) {
        this.person = new Person();
      } else {
        departmentId = this.person.department.id;
      }
      this.form = this.fb.group({
        id: this.person.id,
        firstName: [this.person.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
        lastName: [this.person.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
        email: [this.person.email, [Validators.required, Validators.email]],
        departmentId: [departmentId, [Validators.required]],
        isStaff: [this.isStaff(this.person.personfunction)],
        isModelLeader: [this.isModelLeader(this.person.personfunction)]
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
        let personfunction = PersonFunction.STUDENT;
        if (this.form.value.isStaff === true) {
          personfunction = PersonFunction.STAFF;
          if (this.form.value.isModelLeader === true) {
            personfunction = PersonFunction.MODEL_LEADER;
          }
        }
        this.person = this.form.value;
        this.person.personfunction = personfunction;
        this.personService.savePerson(this.person).subscribe(
         data => {
           console.log('add Person', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add person', error);
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
      let personfunction = PersonFunction.STUDENT;
      if (this.form.value.isStaff === true) {
        personfunction = PersonFunction.STAFF;
        if (this.form.value.isModelLeader === true) {
          personfunction = PersonFunction.MODEL_LEADER;
        }
      }
      this.person = this.form.value;
      this.person.personfunction = personfunction;
      this.personService.savePerson(this.person).subscribe(
       data => {
         console.log('add Person', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('failed to add person', error);
         this.serverError = error.message;
       }
     );
  }

    private isStaff(personFunction): boolean {
      return personFunction === PersonFunction.MODEL_LEADER  || personFunction === PersonFunction.STAFF;
    }

    private isModelLeader(personFunction): boolean {
      return personFunction === PersonFunction.MODEL_LEADER;
    }

}
