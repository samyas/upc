import { Assign } from './../model/assign.model';
import { Paged } from '../model/paged.model';
import { Project, ProjectOverview, Goal, Apply } from '../model/project.model';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';


@Injectable()
export class ProjectService {

  public static readonly PROJECT_URI = environment.baseUrl + 'projects';
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(ProjectService.PROJECT_URI);
  }

  getPagedProjects(filter: string, sort: string, page: number, size: number): Observable<Paged<ProjectOverview>> {
    return this.http.get<Paged<Project>>(ProjectService.PROJECT_URI + '/paged?page=' + page + '&size=' + size);
  }

  getProjectDetail(id: string): Observable<Project> {
    return this.http.get<Project>(ProjectService.PROJECT_URI + '/' + id);
  }
  addGoal(id: string, goal: Goal): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals', JSON.stringify(goal),  {responseType: 'text'});
  }

  apply(id: string, apply: Apply): Observable<any> {
    console.log('id' , id, apply);
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/apply', JSON.stringify(apply),  {responseType: 'text'});
  }

  assign(id: string, assign: Assign): Observable<any> {
    console.log('id' , id, assign);
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/assign', JSON.stringify(assign),  {responseType: 'text'});
  }

  assignTask(id: string, goalId: string, taskId: string, assign: Assign): Observable<any> {
    console.log('id' , id, assign);
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/' + taskId + '/assign',
     JSON.stringify(assign),  {responseType: 'text'});
  }

  addTask(id: string, goalId: string, task: Task): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks',  JSON.stringify(task),
     {responseType: 'text'});
  }

  changeStatus(id: string, goalId: string, taskId: string, status: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/'  + taskId + '/status',  status,
     {responseType: 'text'});
  }

  getTask(id: string, goalId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/' + taskId);
  }


  updateProject(consultant: Project): Observable<any> {
    return this.http.put(ProjectService.PROJECT_URI, JSON.stringify(consultant));
  }

  addProject(consultant: Project): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI, JSON.stringify(consultant),  {responseType: 'text'});
  }

    deleteProject(id: string): Observable<any> {
    return this.http.delete(ProjectService.PROJECT_URI + '/' + id);
  }

}


