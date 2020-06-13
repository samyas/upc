import { Organisation, Module, Action, Term } from './../model/organisation.model';
import { Paged } from '../model/paged.model';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';

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
    return this.http.get<Organisation>(OrganisationService.ORGANISATION_URI + '/connected/user');
  }

  addOrganisation(organisation: Organisation): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI, JSON.stringify(organisation),  {responseType: 'text'});
  }

  addDepartment(organisationId: string, department: Module): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments',
     JSON.stringify(department),  {responseType: 'text'});
  }

  getModule(organisationId: string, departmentId: string): Observable<Module> {
    return this.http.get<Module>(OrganisationService.ORGANISATION_URI + '/' + organisationId  + '/departments/' + departmentId);
  }

  updateDepartment(organisationId: string, department: Module): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments',
     JSON.stringify(department),  {responseType: 'text'});
  }

  updateModule(organisationId: string, module: Module): Observable<any> {
    return this.http.put(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments/' + module.departmentId,
     JSON.stringify(module),  {responseType: 'text'});
  }

  getActions(organisationId: string, departmentId: string): Observable<Array<Action>> {
    return this.http.get<Array<Action>>(OrganisationService.ORGANISATION_URI + '/' + organisationId
     + '/departments/' + departmentId + '/actions');
  }

  deleteAction(organisationId: string, departmentId: string, actionId: string): Observable<any> {
    return this.http.delete(OrganisationService.ORGANISATION_URI + '/' + organisationId
     + '/departments/' + departmentId + '/actions/' + actionId);
  }

  addAction(organisationId: string, departmentId: string, action: Action): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments/' + departmentId + '/actions',
     JSON.stringify(action),  {responseType: 'text'});
  }

  updateAction(organisationId: string, departmentId: string, action: Action): Observable<any> {
    return this.http.put(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments/' + departmentId +
    '/actions/' + action.actionId,
     JSON.stringify(action),  {responseType: 'text'});
  }


  getTerms(organisationId: string, departmentId: string): Observable<Array<Term>> {
    return this.http.get<Array<Term>>(OrganisationService.ORGANISATION_URI + '/' + organisationId
     + '/departments/' + departmentId + '/terms');
  }

  deleteTerm(organisationId: string, departmentId: string, termId: string): Observable<any> {
    return this.http.delete(OrganisationService.ORGANISATION_URI + '/' + organisationId
     + '/departments/' + departmentId + '/terms/' + termId);
  }

  addTerm(organisationId: string, departmentId: string, term: Term): Observable<any> {
    return this.http.post(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments/' + departmentId + '/terms',
     JSON.stringify(term),  {responseType: 'text'});
  }

  updateTerm(organisationId: string, departmentId: string, term: Term): Observable<any> {
    return this.http.put(OrganisationService.ORGANISATION_URI + '/' + organisationId + '/departments/' + departmentId +
    '/terms/' + term.termId,
     JSON.stringify(term),  {responseType: 'text'});
  }
}
