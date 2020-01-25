import { Observable } from 'rxjs/Observable';

import { TaskComponent } from '../task/task.component';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../core/services/project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectOverview, Project, Goal } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AddGoalComponent } from '../goal/add-goal.component';
import { Task } from 'src/app/core/model/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  project: Project = new Project();
  selectedGoal: Goal;
  selectedTask: Task;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit() {

    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
      });
  }

    loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => this.project = data,
         error => console.log(error));
    }

  public openTaskDialog(goalId, task) {

   /* const dialogRef = this.dialog.open(TaskComponent, {
        data: task
    });
    dialogRef.afterClosed().subscribe(taskToSave => {
        if (taskToSave) {
          (taskToSave.taskId) ? this.createTask(goalId, taskToSave) : this.createTask(goalId, taskToSave);
        }
    });*/
  }

  public openGoalDialog(content: string) {

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
      this.selectedGoal =  this.project.goals.find( g => g.goalId === goalId);
      this.selectedTask = this.selectedGoal.tasks.find(t => t.taskId === taskId) ;
    }
  }

  createTask(goalId: string, task: Task) {
    this.projectService.addTask(this.project.projectId, goalId, task)
    .subscribe( taskId => this.loadProject(this.project.projectId)
    , error => console.log('failed to add task', error));
  }
}
