import { Paged } from './../model/paged.model';
import { Project, ProjectOverview, Goal } from './../model/project.model';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person.model';


@Injectable()
export class PersonService {

  public static readonly PERSON_URI = environment.baseUrl + 'persons';
  constructor(private http: HttpClient) {}

  getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<Person>>(PersonService.PERSON_URI);
  }

  getPagedPersons(filter: string, sort: string, page: number, size: number): Observable<Paged<Person>> {
    return this.http.get<Paged<Person>>(PersonService.PERSON_URI + '/paged?page=' + page + '&size=' + size);
  }

  getFiltredPagedPersons(name: string, student: boolean, sort: string, page: number, size: number): Observable<Paged<Person>> {
    let url = '/paged?page=' + page + '&size=' + size + '&student=' + student;
    if (name) { url = url + '&name=' + name; }
    return this.http.get<Paged<Person>>(PersonService.PERSON_URI + url);
  }

  getPersonDetail(id: string): Observable<Person> {
    return this.http.get<Person>(PersonService.PERSON_URI + '/' + id);
  }

  getPersonProjects(id: string): Observable<Array<ProjectOverview>> {
    return this.http.get<Array<ProjectOverview>>(PersonService.PERSON_URI + '/' + id + '/projects');
  }

  getPersonCurrent(): Observable<Person> {
    return this.http.get<Person>(PersonService.PERSON_URI + '/current/info');
  }

  syncAll(moduleId: string): Observable<any> {
    return this.http.put(PersonService.PERSON_URI + '/sync-all?departmentId=' + moduleId, {},  {responseType: 'text'});
  }

  addPerson(person: Person): Observable<any> {
    return this.http.post(PersonService.PERSON_URI, JSON.stringify(person),  {responseType: 'text'});
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(PersonService.PERSON_URI  + '/' + person.id, JSON.stringify(person),  {responseType: 'text'});
  }

  savePerson(person: Person): Observable<any> {
    return (person.id) ? this.updatePerson(person) : this.addPerson(person);
  }

}
