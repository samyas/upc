import { Register, ShortOrganisation, User, AuthUser } from './../model/auth.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paged } from '../model/paged.model';
import { JoinRequest } from '../model/join-request.model';

@Injectable()
export class AuthService {

    // store the URL so we can redirect after logging in


    public static readonly REGISTER_URI = environment.baseUrl + 'auth';

    constructor(private http: HttpClient) {
    }

    register(register: Register): Observable<string> {
       this.logout();
        return this.http.post(AuthService.REGISTER_URI +  '/register',  JSON.stringify(register),
         {responseType: 'text'});
    }

    login(username: string, password: string): Observable<AuthUser> {
        this.logout();
        return this.http.post<AuthUser>(AuthService.REGISTER_URI +  '/login',
             JSON.stringify({'username': username, 'password': password }))
              .pipe(map( authUser  => {
            // login successful if there's a jwt token in the response
            if (authUser) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               authUser.username = username;
               this.saveCurrentUser(authUser);
               return authUser;
            }
            return null;
        }));
    }

    saveCurrentUser(authUser: AuthUser): any {
        localStorage.setItem('currentUser', JSON.stringify(authUser));
    }

    public get currentUserValue(): AuthUser {
        return JSON.parse(localStorage.getItem('currentUser'));
    }


    validate(emailValidationToken: string): Observable<any> {
        return this.http.get(AuthService.REGISTER_URI +  '/validate-creator?token=' + emailValidationToken,
         {responseType: 'text'});
    }

    resetPassword(register: Register): Observable<string> {
        this.logout();
         return this.http.post(AuthService.REGISTER_URI +  '/reset-password',  JSON.stringify(register),
          {responseType: 'text'});
     }

     requestResetPassword(email: string): Observable<string> {
        this.logout();
         return this.http.post(AuthService.REGISTER_URI +  '/reset-password-request',  email,
          {responseType: 'text'});
     }

    validateJoinRequest(emailValidationToken: string): Observable<JoinRequest> {
        return this.http.get<JoinRequest>(AuthService.REGISTER_URI +  '/validate-join-request?token=' + emailValidationToken);
    }

    validateResetRequest(emailValidationToken: string): Observable<JoinRequest> {
        return this.http.get<JoinRequest>(AuthService.REGISTER_URI +  '/validate-reset-request?token=' + emailValidationToken);
    }

    activate(userId: string): Observable<any> {
        return this.http.get(AuthService.REGISTER_URI +  '/activate/' + userId,
         {responseType: 'text'});
    }

    activateAccount(code: string): Observable<AuthUser> {
        return this.http.get<AuthUser>(AuthService.REGISTER_URI +  '/activate-account?code=' + code).pipe(map( authUser  => {
            // login successful if there's a jwt token in the response
            if (authUser) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               authUser.username = this.currentUserValue.username;
               this.saveCurrentUser(authUser);
               return authUser;
            }
            return null;
        }));
    }

    getCodeForTest(): Observable<any> {
        return this.http.get(AuthService.REGISTER_URI +  '/getActivationToken/',
         {responseType: 'text'});
    }
    userInfo(): Observable<User> {
        return this.http.get<User>(AuthService.REGISTER_URI +  '/info/');
    }

    getPagedUsers(filter: string, sort: string, page: number, size: number): Observable<Paged<User>> {
        return this.http.get<Paged<User>>(AuthService.REGISTER_URI + '/users/paged?page=' + page + '&size=' + size + filter);
      }

    getEmailToken(userId: string): Observable<string> {
        return this.http.get(AuthService.REGISTER_URI +  '/getToken?userId=' + userId,
         {responseType: 'text'});
    }

    linkToOrganisation(tenantId: number): Observable<AuthUser> {
        return this.http.get<AuthUser>(AuthService.REGISTER_URI +  '/link?id=' + tenantId).pipe(map( authUser  => {
            // login successful if there's a jwt token in the response
            if (authUser) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               authUser.username = this.currentUserValue.username;
               this.saveCurrentUser(authUser);
               return authUser;
            }
            return null;
        }));
    }

    getShortOrganisations(): Observable<Array<ShortOrganisation>> {
        return this.http.get<Array<ShortOrganisation>>(AuthService.REGISTER_URI +  '/organisations');
    }

    logout(): any {
          // remove user from local storage to log user out
          localStorage.removeItem('currentUser');
    }
}
