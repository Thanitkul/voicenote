import { Injectable } from '@angular/core';
import {HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signin(data: any){
    return this.http.post(`${environment.apiHost}/auth/signin`, data)
  }
}
  