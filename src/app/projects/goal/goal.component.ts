import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Goal } from './../../core/model/project.model';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<GoalComponent>,
    @Inject(MAT_DIALOG_DATA) public goal: Goal,
    public fb: FormBuilder) {
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
        if (this.goal) {
          this.form.setValue(this.goal);
        } else {
        this.goal = new Goal();
        }
    }

    close(): void {
      this.dialogRef.close();
    }

}
