import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

//   get_username1() {
//       let headers = new HttpHeaders()
//       headers.set('content-type', 'application/json')
//       headers.set('Access-Control-Allow-Origin', '*')
//       console.log(headers); 
//       return this.http.get('http://localhost:3000/auth/get-username', {
//           headers: headers
//       })

//   }
    get_username(auth_token: any) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/auth/get-username', { headers: headers })
    }
    get_course(auth_token: any) {
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get('http://localhost:3000/teacher/courses', { headers: headers })
    }
    create_course(name: string, auth_token: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        })
        const body = {
            courseName: name
        };
        this.http.post<any>('http://localhost:3000/teacher/create-course', body, { headers: headers }).subscribe(res => console.log(res))
    }
}
