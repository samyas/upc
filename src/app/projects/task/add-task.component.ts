import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Task } from '../../core/model/task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public form: FormGroup;
  @Input() public task: Task;
  @Input() public projectId;
  @Input() public goalId;

  public Editor = ClassicEditor;

  submitted = false;
  serverError = '';
  workshops = ['Edx Material Training', 'Crystal Formation'];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public projectService: ProjectService) {
    }

    ngOnInit() {
      if (!this.task) {
            this.task = new Task();
      }
      this.form = this.fb.group({
        taskId: this.task.taskId,
        name: [this.task.name, Validators.compose([Validators.required, Validators.minLength(5)])],
        description: [this.task.description, Validators.compose([Validators.required, Validators.minLength(6)])],
        startDate: this.task.startDate,
        endDate: this.task.endDate,
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
        this.task = this.form.value;
        this.projectService.addTask(this.projectId, this.goalId, this.task).subscribe(
         data => {
           console.log('add Task', data);
           this.activeModal.close();
         }
         , error =>  {
           console.log('failed to add task', error);
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
      this.task = this.form.value;
      this.projectService.updateTask(this.projectId, this.goalId, this.task).subscribe(
       data => {
         console.log('update Task', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('update to add task', error);
         this.serverError = error.message;
       }
     );
  }

}
