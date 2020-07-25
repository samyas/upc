import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';

import { Goal } from '../../core/model/project.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  @Input() public goal: Goal;

  public form: FormGroup;
  @Input() public projectId;
  @Input() public isAction;

  public Editor = ClassicEditor;

  files: Array<any> = [];
  submitted = false;
  serverError = null;
  workshops = ['Edx Material Training', 'Crystal Formation'];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public projectService: ProjectService) {
    }

    ngOnInit() {
      if (!this.goal) {
        this.goal = new Goal();
        if (this.isAction) {
          this.goal.isAction = true;
        }
      }
      this.form = this.fb.group({
        goalId: this.goal.goalId,
        name: [this.goal.name, Validators.compose([Validators.required, Validators.minLength(5)])],
        description: [this.goal.description, Validators.compose([Validators.required, Validators.minLength(6)])],
        startDate: this.goal.startDate,
        endDate:  this.goal.endDate,
        followWorkshop: [false],
        workshop: null
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
        this.goal = this.form.value;
        this.projectService.addGoal(this.projectId, this.goal, this.files).subscribe(
         data => {
           console.log('add Goal', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add goal', error);
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
      this.goal = this.form.value;
      this.projectService.updateGoal(this.projectId, this.goal, this.files).subscribe(
       data => {
         console.log('update Goal', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('update to update Goal', error);
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
