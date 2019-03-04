import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginService {
    public isLoggedIn = false;
    public token: string;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private http: Http) {
        // set token if saved in local storage
       /* const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (this.token) {
            this.isLoggedIn = true;
        }*/
    }

    login(username: string, password: string): Observable<boolean> {
        const body = JSON.stringify({ username: username, password: password });
        return Observable.of(true); /*this.http.post('/api/auth', body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.text();
                if (token) {
                    // set token property
                    this.token = token;
                    this.isLoggedIn = true;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });*/
    }


    logout(): void {
        this.isLoggedIn = false;
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
