import { Paged } from './../model/paged.model';
import { Project, ProjectOverview, Goal } from './../model/project.model';

import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person.model';


@Injectable()
export class PersonService {

  public static readonly PERSON_URI = 'https://ppms-back.herokuapp.com/api/persons';
  constructor(private http: HttpClient) {}

  getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<Person>>(PersonService.PERSON_URI);
  }

  getPagedPersons(filter: string, sort: string, page: number, size: number): Observable<Paged<Person>> {
    return this.http.get<Paged<Person>>(PersonService.PERSON_URI + '/paged?page=' + page + '&size=' + size);
  }

  getPersonDetail(id: string): Observable<Person> {
    return this.http.get<Person>(PersonService.PERSON_URI + '/' + id);
  }
}
