import { Message } from './../model/task.model';
import { Assign, AssignMember } from './../model/assign.model';
import { Paged } from '../model/paged.model';
import { Project, ProjectOverview, Goal, Apply } from '../model/project.model';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';

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

  getPagedProjectsWithGoals(filter: string, sort: string, page: number, size: number): Observable<Paged<ProjectOverview>> {
    return this.http.get<Paged<Project>>(ProjectService.PROJECT_URI + '/with-goals/paged?page=' + page + '&size=' + size);
  }

  getProjectDetail(id: string): Observable<Project> {
    return this.http.get<Project>(ProjectService.PROJECT_URI + '/' + id);
  }
  addGoal(id: string, goal: Goal, files?: Array<any>): Observable<any> {
    if (files && files.length && files.length > 0) {
      const formData: any = new FormData();
      files.forEach(f =>  formData.append('files', f));
      formData.append('goal', new Blob([JSON.stringify(goal)], { type: 'application/json'}));
      return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals-with-upload'
      , formData,  {responseType: 'text'});
    } else {
      return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals',
      JSON.stringify(goal),  {responseType: 'text'});
    }

  }

  updateGoal(id: string, goal: Goal, files?: Array<any>): Observable<any> {
    if (files && files.length && files.length > 0) {
      const formData: any = new FormData();
      files.forEach(f =>  formData.append('files', f));
      formData.append('goal', new Blob([JSON.stringify(goal)], { type: 'application/json'}));
      return this.http.put(ProjectService.PROJECT_URI + '/' + id + '/goals-with-upload/' + goal.goalId
      , formData,  {responseType: 'text'});
    } else {
      return this.http.put(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goal.goalId ,
      JSON.stringify(goal),  {responseType: 'text'});
    }
  }

  updateGoalStatus(id: string, goalId: string, status: string, description: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/status?status=' + status
    , description === null ? {} : JSON.stringify({'description' : description}),  {responseType: 'text'});
  }

  updateGoalStatusExt(id: string, goalId: string, status: string,  description: string, files: Array<any>): Observable<any> {
    if (files && files.length && files.length > 0) {
      const formData: any = new FormData();
      files.forEach(f =>  formData.append('files', f));
      formData.append('task', new Blob([JSON.stringify({'description' : description})], { type: 'application/json'}));
      return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/status-with-upload?status=' + status
      , formData,  {responseType: 'text'});
    } else {
      return this.updateGoalStatus(id, goalId, status, description);
    }


  }

  apply(id: string, apply: Apply): Observable<any> {
    console.log('id' , id, apply);
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/apply', JSON.stringify(apply),  {responseType: 'text'});
  }

  assign(id: string, assign: Assign): Observable<any> {
    console.log('id' , id, assign);
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/assign', JSON.stringify(assign),  {responseType: 'text'});
  }

  assignMember(id: string, assign: AssignMember): Observable<any> {
    return  (assign.termId) ? this.assignSupervisor(id, assign) : this.assignTeam(id, assign);
  }

  assignSupervisor(id: string, assign: AssignMember): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/assign-supervisor', JSON.stringify(assign),  {responseType: 'text'});
  }

  assignTeam(id: string, assign: AssignMember): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/assign-students', JSON.stringify(assign),  {responseType: 'text'});
  }

  unAssignSupervisor(id: string, personId: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/unassign?position=members&personId=' + personId,
     null,  {responseType: 'text'});
  }

  unAssignTeam(id: string, personId: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/unassign?position=team&personId=' + personId,
     null,  {responseType: 'text'});
  }

  assignTask(id: string, goalId: string, taskId: string, assign: Assign): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/' + taskId + '/assign',
     JSON.stringify(assign),  {responseType: 'text'});
  }

  changeStatus(id: string, status: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/status/to?status=' + status,
     null,  {responseType: 'text'});
  }

  sign(id: string, position: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/sign?position=' + position,
     null,  {responseType: 'text'});
  }

  addTask(id: string, goalId: string, task: Task): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks',  JSON.stringify(task),
     {responseType: 'text'});
  }

  addMessage(id: string, goalId: string, taskId: string, message: Message): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/'
     + taskId + '/messages',  JSON.stringify(message), {responseType: 'text'});
  }

  updateMessage(id: string, goalId: string, taskId: string, messageId: string, message: Message): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/'
     + taskId + '/messages/' + messageId,  JSON.stringify(message), {responseType: 'text'});
  }

  changeStatuTask(id: string, goalId: string, taskId: string, status: string): Observable<any> {
    return this.http.post(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/'  + taskId + '/status',  status,
     {responseType: 'text'});
  }

  getTask(id: string, goalId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/' + taskId);
  }

  updateTask(id: string, goalId: string, task: Task): Observable<any> {
    return this.http.put(ProjectService.PROJECT_URI + '/' + id + '/goals/' + goalId + '/tasks/' + task.taskId ,
     JSON.stringify(task),  {responseType: 'text'});
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(ProjectService.PROJECT_URI +  '/' +  project.projectId, JSON.stringify(project),  {responseType: 'text'});
  }

  addProject(project: Project, image?: any): Observable<any> {
    if (image) {
      const formData: any = new FormData();
      formData.append('image', image);
      formData.append('project', new Blob([JSON.stringify(project)], { type: 'application/json'}));
      return this.http.post(ProjectService.PROJECT_URI + '/with-upload' , formData,  {responseType: 'text'});
    } else {
      return this.http.post(ProjectService.PROJECT_URI, JSON.stringify(project),  {responseType: 'text'});
    }
  }


    deleteProject(id: string): Observable<any> {
    return this.http.delete(ProjectService.PROJECT_URI + '/' + id);
  }

}


