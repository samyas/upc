import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ErrorResponse } from '../model/error.response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authService.logout();
            location.reload(true);
        }
        let errorReponse: ErrorResponse = new ErrorResponse();
        if ( (err.status === 400 || err.status === 500)   && err && err.error) {
            console.log('Parse json', typeof err.error);
            if (typeof err.error === 'object') {
                errorReponse = err.error;
                console.log('object', err.error);
            } else {
                console.log('not object', err.error);
                errorReponse = JSON.parse(err.error);
            }
            if (!errorReponse.message) {
                errorReponse.message = 'Currently system is unavailable. Please contact Adminsitrators';
            }
            return throwError(errorReponse);
        }
        console.log('Uncatched error', err);
        errorReponse.message = 'Currently system is unavailable. Please contact Adminsitrators';
        return throwError(errorReponse);
    }));
}
}
