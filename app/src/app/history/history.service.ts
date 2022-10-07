<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getrecordings(course_id: string) {
    return this.http.get(`${environment.apiHost}/get-recording/${course_id}`)}}
=======
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    constructor(private http: HttpClient) { }

    getHistory(id: string | null) {

        return this.http.get(`${environment.apiHost}/student/get-recordings/` + id)
    }
    

}
>>>>>>> origin/main
