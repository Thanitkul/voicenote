import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    get_username(auth_token: any) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/auth/get-username')
    }
    get_course(auth_token: any) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/teacher/courses')
    }
    create_course(name: string, auth_token: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            courseName: name
        };
        this.http.post<any>('http://localhost:3000/teacher/create-course', body).subscribe(res => console.log(res))
    }
    get_course_student(auth_token: any) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/student/courses')
    }
    add_course(code: string, auth_token: any) {
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