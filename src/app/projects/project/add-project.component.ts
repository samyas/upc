import { OrganisationService } from './../../core/services/organisation.service';
import { Department, Organisation } from './../../core/model/organisation.model';

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/model/project.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';

export interface Fruit {
  name: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  public project: Project = new Project();
  public person: Person = new Person();
  public organisation: Organisation = new Organisation();
  public departments: Array<Department> = [];
  public form: FormGroup;
  submitted = false;
  serverError = '';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruits: Fruit[] = [
  ];

  types = [
    {value: 'PFE', viewValue: 'PFE'},
    {value: 'MASTER', viewValue: 'MASTER'},
    {value: 'PFA', viewValue: 'PFA'},
    {value: 'These', viewValue: 'These'}
  ];

  constructor(  private router: Router, private projectService: ProjectService,
    private organisationService: OrganisationService,
    private personService: PersonService,
    public fb: FormBuilder) {
        this.form = this.fb.group({
          id: this.project.projectId,
          name : [this.project.name, Validators.compose([Validators.required, Validators.minLength(5)])],
          type: [this.project.type, [Validators.required]],
          departmentId: [null, [Validators.required]],
          description: [this.project.longDescription, Validators.compose([Validators.required, Validators.minLength(3)])],
          shortDescription: [this.project.description, Validators.compose([Validators.required, Validators.minLength(3)])],
          startDate: this.project.startDate,
          endDate: this.project.endDate,
          workshop: null
      });
  }

  ngOnInit() {
    this.loadOrganisation();
  }

  loadOrganisation() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
         this.getPersonInfo();
      }
      , error =>  {
        console.log(error);
      }
    );
  }

  get f() { return this.form.controls; }

  getPersonInfo() {
    this.personService.getPersonCurrent().subscribe( data => {
     this.person = data;
     if (this.person.department) {
      this.departments = this.organisation.departments.filter(d => d.id === this.person.department.id );
     } else {
      this.departments = this.organisation.departments;
     }

    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }

  save() {
    this.submitted = true;
    console.log('stange', this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.projectService.addProject(this.form.value).subscribe( id => {
      console.log('success', id);
      this.router.navigate(['home/project/' + id]);

    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }


  add(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


}
