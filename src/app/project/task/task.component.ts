import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    public fb: FormBuilder) {
        this.form = this.fb.group({
          id: null,
          title: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
          description: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
          startDate: null,
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
        if (this.task) {
          this.form.setValue(this.task);
        } else {
        this.task = new Task();
        }
    }

    close(): void {
      this.dialogRef.close();
    }

}
