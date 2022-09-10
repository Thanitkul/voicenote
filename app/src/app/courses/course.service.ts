import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        return this.http.get('http://localhost:3000/auth/get-username')
    }
    getCourseTeacher(auth_token: string) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/teacher/courses')
    }
    createCourse(name: string, auth_token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            courseName: name
        };
        this.http.post<any>('http://localhost:3000/teacher/create-course', body).subscribe(res => console.log(res))
    }
    getCourseStudent(auth_token: string) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/student/courses')
    }
    addCourse(code: string, auth_token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            code: code
        };
        this.http.post<any>('http://localhost:3000/student/join-course', body).subscribe(res => console.log(res))
    }
}
