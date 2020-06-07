
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../model/auth.model';


@Injectable()
export class SharedDataService {

  private organisationIdSource = new BehaviorSubject(undefined);
  currentOrganisationId = this.organisationIdSource.asObservable().pipe(filter(id => id !== undefined));

  private userSource = new BehaviorSubject<User>(undefined);
  currentUser = this.userSource.asObservable().pipe(filter(p => p !== undefined));


  constructor() { }

  saveOrganisationId(id: string) {
    this.organisationIdSource.next(id);
  }

  saveUser(user: User) {
    this.userSource.next(user);
  }


 /* getOrganisationId(): Observable<string> {
    return this.currentOrganisationId;
  }*/

  get organisationId(): string {
    // console.log('get 1', this.organisationIdSource.getValue());
    // this.currentOrganisationId.subscribe(    data => console.log('get 2', data));
     return this.organisationIdSource.getValue();
  }
}
