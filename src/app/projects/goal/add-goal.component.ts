import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Goal } from '../../core/model/project.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  public goal: Goal = new Goal();
  public form: FormGroup;
  @Input() public projectId;

  submitted = false;
  serverError = '';

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public projectService: ProjectService) {
        this.form = this.fb.group({
          id: null,
          name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
          description: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
          startDate: null,
          endDate: null,
          workshop: null
         /* profile: this.fb.group({
            name: null,
            surname: null,
            birthday: null,
            gender: null,
            image: null
          })*/
      });
    }

    ngOnInit() {
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
        this.projectService.addGoal(this.projectId, this.goal).subscribe(
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

    close(): void {
    //  this.dialogRef.close();
    }

}
