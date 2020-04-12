import { Component, OnInit, Inject, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Task, Message } from '../../core/model/task.model';
import { ProjectService } from 'src/app/core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';
import { FileUploaderService } from 'src/app/core/services/file-uploader.service';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { Assign } from 'src/app/core/model/assign.model';
import { Person } from 'src/app/core/model/person.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from './add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() projectId;
  @Input() goalId;
  @Input() persons: Array<Person>;

  public Editor = ClassicEditor;
  error = null;
  errorComment = null;
  files: any = [];
  isComment = false;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };
  public editShow = new EditShow();
  submitted = false;
  serverError = '';
  workshops = ['Edx Material Training', 'Crystal Formation'];


  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService,
    private modalService: NgbModal,
    ) { }

    ngOnInit() {
    }

    loadTask(id: string) {
      this.projectService.getTask(this.projectId, this.goalId, id).subscribe(
      data => {this.task = data; },
      error => console.log(error));
     }

    uploadFileTask(event) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        const id = this.projectId + ':' + this.goalId + ':' + this.task.taskId;
        this.uploadService.uploadFile(element, element.name, id , 'TASK')
        .subscribe( data => {console.log('attch success'); this.loadTask(this.task.taskId); },
        error => console.log(error));
      }
    }

    download(key: string, fileName: string, contentType: string) {
      this.downloadService.downloadFile(key, fileName, contentType);
    }

    deleteAttachmentTask(key) {
      const id = this.projectId + ':' + this.goalId + ':' + this.task.taskId;
      this.uploadService.deleteFile(key, 'TASK', id)
        .subscribe( data => {console.log('delete attch success'); this.loadTask(this.task.taskId); },
        error => console.log(error));
    }

    onAssignTask($event) {
      console.log('Assign task selected', $event.id);
      console.log('test');
      const assignment:  Assign = new Assign();
      assignment.personId = $event.id;
      assignment.action = 'ADD';
      assignment.position = 'TEAM';
      this.assignTask(this.projectId, this.goalId, this.task.taskId, assignment);
    }

    changeStatus(newStatus) {
      this.projectService.changeStatus(this.projectId,  this.goalId, this.task.taskId, newStatus).subscribe(
        data => {
          this.loadTask(this.task.taskId);
        }
        , error => alert(error)
      );
    }

    assignTask(projectId, goalId, taskId, assign: Assign) {
      this.projectService.assignTask(projectId,  goalId, taskId, assign).subscribe(
        data => {
          this.loadTask(taskId);
        }
        , error => alert(error)
      );
    }

    public editTaskDialog() {
      const modalRef = this.modalService.open(AddTaskComponent);
      modalRef.componentInstance.projectId = this.projectId;
      modalRef.componentInstance.goalId = this.goalId;
      modalRef.componentInstance.task = this.task;
      modalRef.result.then((result) => {
          console.log('modal sucess:' + result);
          this.loadTask(this.task.taskId);
          }, (reason) => {
            console.log('modal failed:' + reason);
          }
        );
    }

    updateTask() {
      this.projectService.updateTask(this.projectId, this.goalId, this.task)
      .subscribe( data => {
        this.editShow.reset();
        this.loadTask(this.task.taskId);
      }
      , error => {
        console.log('failed to update project', error);
        this.error = error.message;
      });
    }

    initComment() {
      this.isComment = false;
      this.model.editorData = null;
      this.errorComment = null;
    }
    addMessage(goalId: string, taskId: string) {
      const message: Message = new Message();
      message.content =  this.model.editorData;
      this.projectService.addMessage(this.projectId,
        this.goalId, this.task.taskId, message)
      .subscribe( messageId => {  this.initComment(); this.loadTask(this.task.taskId); }
      , error => {
        console.log('failed to add message', error);
        this.errorComment = error.message;
      });
    }

    updateMessage(goalId: string, taskId: string, messageId: string) {
      const message: Message = new Message();
      message.content = this.model.editorData;
      this.projectService.updateMessage(this.projectId,
        this.goalId, this.task.taskId, messageId, message)
        .subscribe( umessageId => {  this.initComment(); this.loadTask(this.task.taskId); }
        , error => {
          console.log('failed to add message', error);
          this.errorComment = error.message;
        });
    }
}

class EditShow {
  title: boolean;
  shortDescription: boolean;
  description: boolean;

  constructor() {
    this.title = false;
    this.shortDescription = false;
    this.description = false;
  }

  reset() {
    this.title = false;
    this.shortDescription = false;
    this.description = false;
  }
}