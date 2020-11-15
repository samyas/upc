import { OrganisationService } from './../../core/services/organisation.service';
import { Module, Organisation } from './../../core/model/organisation.model';

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectOverview, Project, Goal } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';

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
  public departments: Array<Module> = [];
  public form: FormGroup;
  submitted = false;
  serverError = '';
  public Editor = ClassicEditor;
  public technologies = ['IOT', 'IP'];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruits: Fruit[] = [
  ];
  image = null;
  imageURL = null;

  constructor(  private router: Router, private route: ActivatedRoute, private projectService: ProjectService,
    private organisationService: OrganisationService,
    private personService: PersonService,
    public fb: FormBuilder) {

  }

  initForm() {
    this.form = this.fb.group({
      projectId: this.project.projectId,
      name : [this.project.name, Validators.compose([Validators.required, Validators.minLength(5)])],
      type: [this.project.type],
      departmentId: [this.project.department ? this.project.department.id : null, [Validators.required]],
      keywords: [this.project.keywords, [Validators.required]],
      description: [this.project.description, Validators.compose([Validators.required, Validators.minLength(3)])],
      shortDescription: [this.project.shortDescription, Validators.compose([Validators.required, Validators.minLength(3)])],
      startDate: this.project.startDate,
      endDate: this.project.endDate,
      workshop: null
  });
  }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
      this.loadProject(id);
    });
    this.loadOrganisation();
  }

  updateForm() {
    if (this.departments && this.departments.length === 1) {
      console.log('update form');
      this.form.controls['departmentId'].patchValue( this.departments[0].departmentId);
    }
  }

  loadProject(id: string) {
    this.projectService.getProjectDetail(id).subscribe(
    data => {this.project = data; this.initForm(); },
    error => console.log(error));
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
      this.departments = this.organisation.departments.filter(d => d.departmentId === this.person.department.id );
     } else {
      this.departments = this.organisation.departments;
     }
     this.updateForm();
    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }

  addkeyword = (term) => (term);
  save() {
    this.submitted = true;
    console.log('stange', this.form.value);
    if (this.form.invalid) {
      console.log(this.form.errors);
      return;
    }
    this.form.value.keywords = this.form.value.keywords;
    this.projectService.addProject(this.form.value, this.image).subscribe( id => {
      console.log('success', id);
      this.router.navigate(['home/project/' + id]);

    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }

  update() {
    this.submitted = true;
    console.log('stange', this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.form.value.keywords = this.form.value.keywords;
    this.projectService.updateProject(this.form.value).subscribe( id => {
      console.log('success', id);
      this.router.navigate(['home/project/' + id]);

    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }


  uploadFile(event) {
    if (event && event.length && event.length > 0) {
      const element = event[0];
      this.image = element;
    if (FileReader) {
          const fr = new FileReader();
          fr.readAsDataURL(this.image);
          fr.onload = (_event) => {
            this.imageURL = fr.result;
          };
      } else {  // Not supported
          // fallback -- perhaps submit the input to an iframe and temporarily store
          // them on the server until the user's session ends.
      }
    }
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
