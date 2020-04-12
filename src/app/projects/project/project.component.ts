import { FileUploaderService } from './../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddTaskComponent } from '../task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../core/services/project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectOverview, Project, Goal } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AddGoalComponent } from '../goal/add-goal.component';
import { Task, Message } from 'src/app/core/model/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { Assign } from 'src/app/core/model/assign.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FileDownloadService } from 'src/app/core/services/file-download.service';


// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = [ 'accent', 'primary', 'warn' ];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  persons: Array<Person> = [];
  public Editor = ClassicEditor;

  selectedPerson = null;
  // <img imgViewer [id]="consultant.photoFileId" default="../assets/img/avatar5.png" class="profile-user-img img-responsive img-circle"/>
  // <input type="file" id="photo-anchor" (change)="onChangePhoto()" ng2FileSelect [uploader]="photoUploader" />
  // public uploader:FileUploader = new FileUploader({});

  project: Project = new Project();
  selectedGoalId = null;
  selectedTask: Task;
  doubleVue = false;
  selectionTeamActive = false;
  selectionAssignTaskActive = false;
  selectionSupervisorActive = false;
  error = null;

  showDescriptionEditor = false;
  showShortDescriptionEditor = false;

  public editShow = new EditShow();

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private  personService: PersonService, private modalService: NgbModal,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
        this.loadPersonData();
      });
  }

  init() {
    this.selectionTeamActive = false;
    this.selectionSupervisorActive = false;
    this.error = null;
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.project.projectId, 'PROJECT')
      .subscribe( data => {console.log('attch success'); this.loadProject(this.project.projectId); },
      error => console.log(error));
    }
  }
  deleteAttachment(key) {
    this.uploadService.deleteFile(key, 'PROJECT', this.project.projectId)
      .subscribe( data => {console.log('delete attch success'); this.loadProject(this.project.projectId); },
      error => console.log(error));
  }

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }

    loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; this.init(); },
         error => console.log(error));
    }

    loadTask(id: string) {
      this.projectService.getTask(this.project.projectId, this.selectedGoalId, id).subscribe(
      data => {this.selectedTask = data; },
      error => console.log(error));
 }


    loadPersonData() {
      this.personService.getPersons().subscribe(
        data => {
          this.persons =  data;
          console.log('ssss', this.persons);
        }
        , error => alert(error)
      );
    }

    onSelectSupervisor($event) {
      console.log('supervisor selected', $event.id);
      console.log('test');
      const assignment:  Assign = new Assign();
      assignment.personId = $event.id;
      assignment.action = 'ADD';
      assignment.position = 'SUPERVISOR';
      this.assign(this.project.projectId, assignment);
    }

    onSelectExecutor($event) {
      console.log('execuctor selected', $event.id);
      const assignment:  Assign = new Assign();
      assignment.personId = $event.id;
      assignment.action = 'ADD';
      assignment.position = 'EXAMINATOR';
      this.assign(this.project.projectId, assignment);
    }

    onSelectTeam( $event) {
      console.log('team selected', $event.id);
      const assignment: Assign = new Assign();
      assignment.personId = $event.id;
      assignment.action = 'ADD';
      assignment.position = 'TEAM';
      this.assign(this.project.projectId, assignment);
    }

    assign(projectId, assign: Assign) {
      this.projectService.assign(projectId, assign).subscribe(
        data => {
          this.loadProject(this.project.projectId);
        }
        , error => alert(error)
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

  public openGoalDialog(goal: Goal) {

    const modalRef = this.modalService.open(AddGoalComponent);
    modalRef.componentInstance.projectId = this.project.projectId;
    modalRef.componentInstance.goal = goal;
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
