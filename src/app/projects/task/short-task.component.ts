import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Task } from '../../core/model/task.model';

@Component({
  selector: 'app-short-task',
  templateUrl: './short-task.component.html',
  styleUrls: ['./short-task.component.scss']
})
export class ShortTaskComponent implements OnInit {
  isCollapsed = false;

  constructor() {
    }

    ngOnInit() {
    }

}
