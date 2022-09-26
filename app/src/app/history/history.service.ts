import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getUsername() {

        return this.http.get(`${environment.apiHost}/auth/get-username`)
    }

}
