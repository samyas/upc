import { StatusProperties, G_REVIEW, G_DECLINED, G_COMPLETED } from '../../core/model/project.model';
import { FileUploaderService } from '../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddTaskComponent } from '../task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { ActivatedRoute, ParamMap, Router, NavigationStart } from '@angular/router';
import { ProjectOverview, Project, Goal, GOAL_STATUS_FLOWS } from '../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { Task, Message, T_ALL_STATUS, T_STATUS_FLOWS } from 'src/app/core/model/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { Assign } from 'src/app/core/model/assign.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  value = 50;
  persons: Array<Person> = [];
  public Editor = ClassicEditor;

  selectedPerson = null;
  // <img imgViewer [id]="consultant.photoFileId" default="../assets/img/avatar5.png" class="profile-user-img img-responsive img-circle"/>
  // <input type="file" id="photo-anchor" (change)="onChangePhoto()" ng2FileSelect [uploader]="photoUploader" />
  // public uploader:FileUploader = new FileUploader({});

  project: Project = new Project();
  goal: Goal = new Goal();
  goals: Array<Goal> = [];
  task: Task = new Task();
  kanban: Array<TaskBoard> = T_ALL_STATUS.map(x => new TaskBoard(x.code, x, []));


  selectedGoalId = null;
  selectedTask: Task = null;
  doubleVue = false;
  selectionTeamActive = false;
  selectionAssignTaskActive = false;
  selectionSupervisorActive = false;
  error = null;
  errorSubmit = null;

  showDescriptionEditor = false;
  showShortDescriptionEditor = false;

  public showActionSubmit = {goalId : null, nextStatus : null};

  public editShow = new EditShow();

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService,
    private  personService: PersonService, private modalService: NgbModal,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService
    ) { }

  ngOnInit() {
  /*
    this.router.events
    .pipe(filter(e => e instanceof NavigationStart))
    .subscribe((e: NavigationStart) => {
      const t = this.router.getCurrentNavigation().extras.state;
      console.log('ddddara', t);
      // Logic here
        });
   */


        this.init();
    this.route.parent.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
        this.loadPersonData();
      });
  }

  init() {
    this.selectionTeamActive = false;
    this.selectionSupervisorActive = false;
    this.error = null;
    this.errorSubmit = null;
    this.showActionSubmit.goalId = null;
    this.showActionSubmit.nextStatus = null;
    this.task.description = null;
  }

  onGoalChange(e) {
    this.goal = e;
    this.fillTasksInKanban(this.goal.tasks);
    console.log('kanban', this.kanban);
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('darg', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log('old/new', event.previousContainer.id, event.container.id);
     // console.log('elemnt',  event.previousContainer.data[ event.previousIndex].taskId);
      const taskId = event.previousContainer.data[ event.previousIndex].taskId;
      this.projectService.changeStatuTask(this.project.projectId,  this.goal.goalId,
        taskId, event.container.id).subscribe(
        data => {
         console.log('succss to move', taskId, event.container.id);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        ,  error => this.error = error.message
      );

    }
  }

  getNextStatus(status): Array<StatusProperties> {
    const result = GOAL_STATUS_FLOWS.filter(x => x.current.code === status);
    if (result.length > 0) {
      return result[0].next;
    }
    return null;
  }

  changeGoalStatus(goalId, nextStatus, task: Task) {

        if (task === null && (nextStatus) && (nextStatus.code === G_REVIEW.code || nextStatus.code === G_DECLINED.code
          || nextStatus.code === G_COMPLETED.code)) {
          this.showActionSubmit.goalId = goalId;
          this.showActionSubmit.nextStatus = nextStatus.code;
          this.errorSubmit = null;
        } else {
          if (nextStatus) {
            this.showActionSubmit.nextStatus = nextStatus.code;
          }
          this.projectService.updateGoalStatus(this.project.projectId, goalId,  this.showActionSubmit.nextStatus , task)
          .subscribe( data => { this.loadProject(this.project.projectId); },
          error => {console.log(error);
            if (this.showActionSubmit.goalId) {
              this.errorSubmit =  error.message;
             } else {
              this.error = error.message;
            }
              });
        }
  }

  changeStatus(taskToChange, newStatus) {
    this.projectService.changeStatuTask(this.project.projectId,  this.goal.goalId, taskToChange, newStatus).subscribe(
      data => {

      }
      ,  error => this.error = error.message
    );
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.project.projectId, 'PROJECT')
      .subscribe( data => {console.log('attch success'); this.loadProject(this.project.projectId); },
      error => {console.log(error),  this.error = error.message; });
    }
  }
  deleteAttachment(key) {
    this.uploadService.deleteFile(key, 'PROJECT', this.project.projectId)
      .subscribe( data => {console.log('delete attch success'); this.loadProject(this.project.projectId); },
      error => {console.log(error),  this.error = error.message; });
  }

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }

    loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; this.goals = this.project.goals.filter(x => (!x.actionId && !x.isAction)); this.init(); },
         error => {console.log(error),  this.error = error.message; });
    }

    loadTask(id: string) {
      this.projectService.getTask(this.project.projectId, this.selectedGoalId, id).subscribe(
      data => {this.selectedTask = data; },
      error => {console.log(error),  this.error = error.message; });
    }

    closeTask() {
        this.selectedTask = null;
    }


    loadPersonData() {
      this.personService.getPersons().subscribe(
        data => {
          this.persons =  data;
        }
        ,   error => {console.log(error),  this.error = error.message; }
      );
    }

    selectGoal(goalId: string) {
      if (this.selectedGoalId === goalId) {
        this.selectedGoalId = null;
      } else {
        this.selectedGoalId = goalId;
      }
    }

    isActiveGoal(goalId: string) {
      console.log('test', this.selectedGoalId, goalId, this.selectedGoalId === goalId);
      return this.selectedGoalId === goalId;
    }


    selectTask(task: Task) {
     this.selectedTask = task;
    }

  public openTaskDialog(goalId) {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.projectId = this.project.projectId;
    modalRef.componentInstance.goalId = goalId;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadProject(this.project.projectId);
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
  }


  updateProject() {
    this.projectService.updateProject(this.project)
    .subscribe( data => {
      this.editShow.reset();
      this.loadProject(this.project.projectId);
    }
    , error => {
      console.log('failed to update project', error);
      this.error = error.message;
    });
  }


  fillTasksInKanban(tasks: Array<Task>) {
    this.kanban = this.kanban.map(x =>  new TaskBoard(x.id, x.status, tasks.filter(t => t.status === x.status.code)));
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

class TaskBoard {
  id: string;
  status: StatusProperties;
  tasks: Array<Task>;
  next: Array<string>;
  constructor(id, status: StatusProperties, tasks) {
    this.id = id;
    this.status = status;
    this.tasks = tasks;
    this.next = T_STATUS_FLOWS.find(x => x.current.code === status.code)
                              .next.map(t => t.code);
  }
}
