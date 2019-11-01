
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/model/project.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

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
  styleUrls: ['./project.component.scss']
})
export class AddProjectComponent implements OnInit {


  public project: Project = new Project();
  public form: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
  ];

  foods: Food[] = [
    {value: 'mecanique', viewValue: 'Meacanique'},
    {value: 'electronic', viewValue: 'Electronic'},
    {value: 'material', viewValue: 'Material'}
  ];

  constructor(  private router: Router, private projectService: ProjectService,
    public fb: FormBuilder) {
        this.form = this.fb.group({
          id: this.project.projectId,
          name : [this.project.name, Validators.compose([Validators.required, Validators.minLength(5)])],
          description: [this.project.longDescription, Validators.compose([Validators.required, Validators.minLength(3)])],
          shortDescription: [this.project.description, Validators.compose([Validators.required, Validators.minLength(3)])],
          startDate: this.project.startDate,
          endDate: this.project.endDate,
          workshop: null
      });
  }

  ngOnInit() {

  }

  save() {
    this.project = this.form.value;
    console.log('pp', this.project);
    this.projectService.addProject(this.form.value).subscribe( id => {
      console.log('success', id);
      this.router.navigate(['home/project/' + id]);

    }, error => console.log('error', error));
  }


  add(event: MatChipInputEvent): void {
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
