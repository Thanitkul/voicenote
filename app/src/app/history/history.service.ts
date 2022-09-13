import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  getrecordings(auth_token:string, course_id:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
  })
  return this.http.get(`${environment.apiHost}/get-recording/${course_id}`)
  }
}
