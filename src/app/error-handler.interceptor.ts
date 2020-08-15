import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private service: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if ( error.status === 504 || error.error == 'Session Expired !'||error.error == "You have to Login hombre !") {
            errorMessage = `You are not logged in ! \n redirecting to home...`;
            this.service.loggedIn = false;
            sessionStorage.removeItem('userId');
            this.router.navigate(['main']);
            alert(errorMessage);
          } else {
            return throwError(error);
          }
        })
      );
  }
}
