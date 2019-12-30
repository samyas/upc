import { Organisation } from './../model/organisation.model';
import { Paged } from '../model/paged.model';
import { environment } from '../../../environments/environment';
import { Project, ProjectOverview, Goal } from '../model/project.model';

import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person.model';


@Injectable()
export class OrganisationService {

  public static readonly ORGANISATION_URI = environment.baseUrl + 'organisations';
  constructor(private http: HttpClient) {}

  getOrganisationDetail(): Observable<Organisation> {
    return this.http.get<Organisation>(OrganisationService.ORGANISATION_URI);
  }

  addOrganisation(organisation: Organisation): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI, JSON.stringify(organisation),  {responseType: 'text'});
  }
}
