import { Observable } from 'rxjs/Observable';

import { AddTaskComponent } from '../task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../core/services/project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectOverview, Project, Goal } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AddGoalComponent } from '../goal/add-goal.component';
import { Task } from 'src/app/core/model/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { Assign } from 'src/app/core/model/assign.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
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

  selectedPerson = null;

  project: Project = new Project();
  selectedGoalId = null;
  selectedTask: Task;
  doubleVue = false;
  selectionTeamActive = false;
  selectionSupervisorActive = false;
  selectionAssignTaskActive = false;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private  personService: PersonService, private modalService: NgbModal) { }

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
  }



    loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; this.init();},
         error => console.log(error));
    }

    loadTask(id: string) {
      this.projectService.getTask(this.project.projectId, this.selectedGoalId, id).subscribe(
      data => {this.selectedTask = data;},
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

    onAssignTask($event) {
      console.log('Assign task selected', $event.id);
      console.log('test');
      const assignment:  Assign = new Assign();
      assignment.personId = $event.id;
      assignment.action = 'ADD';
      assignment.position = 'TEAM';
      this.assignTask(this.project.projectId, this.selectedGoalId, this.selectedTask.taskId, assignment);
    }

    changeStatus(newStatus) {
      this.projectService.changeStatus(this.project.projectId,  this.selectedGoalId, this.selectedTask.taskId, newStatus).subscribe(
        data => {
          this.loadTask(this.selectedTask.taskId);
        }
        , error => alert(error)
      );
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

    assignTask(projectId, goalId, taskId, assign: Assign) {
      this.projectService.assignTask(projectId,  goalId, taskId, assign).subscribe(
        data => {
          this.loadTask(taskId);
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

  public openGoalDialog() {

    const modalRef = this.modalService.open(AddGoalComponent);
    modalRef.componentInstance.projectId = this.project.projectId;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadProject(this.project.projectId);
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
  }



  createGoal(goal: Goal) {
    this.projectService.addGoal(this.project.projectId, goal)
        .subscribe( goalId => this.loadProject(this.project.projectId)
        , error => console.log('failed to add goal', error));
  }

  showTask(goalId: string, taskId: string) {
    if (this.project) {
     // this.selectedGoal =  this.project.goals.find( g => g.goalId === goalId);
     // this.selectedTask = this.selectedGoal.tasks.find(t => t.taskId === taskId) ;
    }
  }

  createTask(goalId: string, task: Task) {
    this.projectService.addTask(this.project.projectId, goalId, task)
    .subscribe( taskId => this.loadProject(this.project.projectId)
    , error => console.log('failed to add task', error));
  }
}
