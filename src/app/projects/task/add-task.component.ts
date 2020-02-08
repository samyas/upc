import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Task } from '../../core/model/task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public form: FormGroup;
  public task: Task = new Task();
  @Input() public projectId;
  @Input() public goalId;

  submitted = false;
  serverError = '';
  workshops = ['Edx Material Training', 'Crystal Formation'];

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public projectService: ProjectService) {
        this.form = this.fb.group({
          id: null,
          name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
          description: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
          startDate: null,
          endDate: null,
          followWorkshop: [false],
          workshop: null
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

}
