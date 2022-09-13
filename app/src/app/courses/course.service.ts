import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getUsername(auth_token: string) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get(`${environment.apiHost}/auth/get-username`)
    }
    getCourseTeacher(auth_token: string) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get(`${environment.apiHost}/teacher/courses`)
    }
    createCourse(name: string, auth_token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            courseName: name
        };
        this.http.post<any>(`${environment.apiHost}/teacher/create-course`, body).subscribe(res => console.log(res))
    }
    getCourseStudent(auth_token: string) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get(`${environment.apiHost}/student/courses`)
    }
    addCourse(code: string, auth_token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            code: code
        };
        this.http.post<any>(`${environment.apiHost}/student/join-course`, body).subscribe(res => console.log(res))
    }
}
