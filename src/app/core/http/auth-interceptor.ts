import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
   // const isApiUrl = request.url.startsWith(config.apiUrl);
    if (isLoggedIn) {
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${currentUser.token}`)});
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

  // setting the accept header
  request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request);
  }
}
