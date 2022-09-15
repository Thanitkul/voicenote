import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class VerifyInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if(token && request.headers !== undefined){
      return next.handle(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })).pipe(tap({
          error: (error: HttpErrorResponse) => {
            if(error.status === 401){
              this.router.navigate([''])
            }
          }
        }))
    }

    return next.handle(request).pipe(tap({
      error: (error: HttpErrorResponse) => {
        if(error.status === 401){
          this.router.navigate([''])
        }
      }
    }))
   }
}
