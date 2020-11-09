import { StatusProperties, G_REVIEW, G_DECLINED, G_COMPLETED } from './../../core/model/project.model';
import { FileUploaderService } from '../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { AddTaskComponent } from '../task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { ActivatedRoute, ParamMap, Router, NavigationStart } from '@angular/router';
import { ProjectOverview, Project, Goal, GOAL_STATUS_FLOWS } from '../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { AddGoalComponent } from './add-goal.component';
import { Task, Message } from 'src/app/core/model/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { Assign } from 'src/app/core/model/assign.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { CurrentUserInfo } from '../user-project.model';



@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = [ 'accent', 'primary', 'warn' ];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  currentUser = new  CurrentUserInfo();
  public Editor = ClassicEditor;

  files:  Array<any> = [];

  selectedPerson = null;

  project: Project = new Project();
  goals: Array<Goal> = [];
  goal: Goal = new Goal();
  task: Task = new Task();
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
     private modalService: NgbModal,  private dataService: SharedDataService,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService
    ) { }

  ngOnInit() {
  /* this.router.events .pipe(filter(e => e instanceof NavigationStart))
    .subscribe((e: NavigationStart) => { const t = this.router.getCurrentNavigation().extras.state;});*/

  this.init();
  this.route.parent.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.dataService.currentUser.subscribe(
          data => {
            this.currentUser.user = data;
            this.loadProject(id);
          },
          error => {console.log(error); }
        );
       });
  }

  init() {
    this.selectionTeamActive = false;
    this.selectionSupervisorActive = false;
    this.error = null;
    this.errorSubmit = null;
    this.showActionSubmit.goalId = null;
    this.showActionSubmit.nextStatus = null;
    this.editShow = new EditShow();
    this.task.description = null;
  }

  loadProject(id: string) {
    this.projectService.getProjectDetail(id).subscribe(
    data => {this.project = data;
             this.isConnectedUserAmemberOfTheProject();
             this.init(); this.goalsRender(); },
    error => {  this.error = error.message; });
  }


  isConnectedUserAmemberOfTheProject() {
    this.currentUser.projectMember = this.project.members.find(x => x.personId === this.currentUser.personId);
    if (! this.currentUser.projectMember ) {
      this.currentUser.projectMember  = this.project.team.find(x => x.personId === this.currentUser.personId);
    }
    this.currentUser.isFirstSupervisor =  this.project.members[0].personId === this.currentUser.personId;
    this.currentUser.isCreator = this.currentUser.personId === this.project.creator.personId;
  }
  goalsRender() {
   this.goals = this.project.goals.map(x =>  {
     x.nextActions = this.getNextStatus(x);
     return x;
    });
  }

  canAddEditAction() {
    return this.currentUser.isFirstSupervisor || this.currentUser.isModelLeader();
  }

  getNextStatus(goal: Goal): Array<StatusProperties> {
    if (goal.isAction) {
      const next: Array<StatusProperties> = GOAL_STATUS_FLOWS.find(x => x.current.code === goal.status)?.next;
      if (next) {
          const nextActions =  next.filter(x => x.roles.includes(this.currentUser.roles[0]));
          if (status === G_REVIEW.code) {
            if (this.currentUser.isFirstSupervisor || this.currentUser.isModelLeader()) {
              return nextActions;
            }
          } else {
            return nextActions;
          }
      }
    }
  }

  /*****************GOALS ****************************/
  changeGoalStatus(goalId, nextStatus) {

        if (nextStatus && (nextStatus.code === G_REVIEW.code || nextStatus.code === G_DECLINED.code
          || nextStatus.code === G_COMPLETED.code)) {
          this.showActionSubmit.goalId = goalId;
          this.showActionSubmit.nextStatus = nextStatus.code;
          this.errorSubmit = null;
        } else {
          if (nextStatus) {
            this.showActionSubmit.nextStatus = nextStatus.code;
          }
          this.projectService.updateGoalStatus(this.project.projectId, goalId,  this.showActionSubmit.nextStatus ,
             null)
          .subscribe( data => { this.loadProject(this.project.projectId); },
          error => {
            if (this.showActionSubmit.goalId) {
              this.errorSubmit =  error.message;
             } else {
              this.error = error.message;
            }
              });
        }
  }

  changeGoalStatusWithDescription(goalId, editShow: EditShow) {

      this.projectService.updateGoalStatusExt(this.project.projectId, goalId,  this.showActionSubmit.nextStatus ,
         editShow.description, editShow.files)
      .subscribe( data => { this.loadProject(this.project.projectId); },
      error => {
        if (this.showActionSubmit.goalId) {
          this.errorSubmit =  error.message;
         } else {
          this.error = error.message;
        }
          });
   }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.editShow.files.push(element);
    }
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

    openGoalDialog(goal?: Goal, isAction?: boolean) {

      const modalRef = this.modalService.open(AddGoalComponent,  {windowClass: 'xlModal'});
      modalRef.componentInstance.projectId = this.project.projectId;
      modalRef.componentInstance.goal = goal;
      modalRef.componentInstance.isAction = isAction;
      modalRef.result.then((result) => {
          console.log('modal sucess:' + result);
          this.loadProject(this.project.projectId);
          }, (reason) => {
            console.log('modal failed:' + reason);
          }
        );
    }

    /**************TASKS************************* */
    selectTask(task: Task) {
     this.selectedTask = task;
    }


    loadTask(id: string) {
      this.projectService.getTask(this.project.projectId, this.selectedGoalId, id).subscribe(
      data => {this.selectedTask = data; },
      error => {console.log(error),  this.error = error.message; });
    }

    closeTask() {
        this.selectedTask = null;
    }

   openTaskDialog(goalId) {
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

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }


}

class EditShow {
  title: boolean;
  shortDescription: boolean;
  description: string;
  files: Array<any>;

  constructor() {
    this.title = false;
    this.shortDescription = false;
    this.description = null;
    this.files = [];
  }

  reset() {
    this.title = false;
    this.shortDescription = false;
    this.description = null;
    this.files = [];
  }
}
