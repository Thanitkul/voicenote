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
    getCourseTeacher() {
        
        return this.http.get(`${environment.apiHost}/teacher/courses`)
    }
    createCourse(name: string) {
        const body = {
            courseName: name
        };
        return this.http.post<any>(`${environment.apiHost}/teacher/create-course`, body)
    }
    getCourseStudent() {
        
        return this.http.get(`${environment.apiHost}/student/courses`)
    }
    addCourse(code: string) {
        const body = {
            code: code
        };
        return this.http.post<any>(`${environment.apiHost}/student/join-course`, body)
    }
    deleteCourse(id: number) {
        const body = {
            courseId: id
        };
        return this.http.delete<any>(`${environment.apiHost}/teacher/delete-course`, {body: body})
    }
    leaveCourse(id: number) {
        const body = {
            courseId: id
        };
        return this.http.delete<any>(`${environment.apiHost}/student/leave-course`, { body: body })
    }
}
