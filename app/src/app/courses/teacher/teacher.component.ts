import { Component, OnInit } from '@angular/core';
declare var window: any;
import axios from 'axios';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
    formModal: any;
    searchText: any;
    username: any;
    courses: any;
    auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MjUzMDkwN30.jPetcdunTjdE_za_eiW-cZ94kOv7DdkGj9RnslJQyIY"
    
    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
        this.courseserv.get_course(this.auth_token).subscribe((res: any) => this.courses = res)
        this.courseserv.get_username(this.auth_token).subscribe((res: any) => this.username = res['username'])
    }
    logout(): void {
        sessionStorage.clear()
    }
    openFormModal() {
        this.formModal.show();
    }
    create() {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        // const token = sessionStorage.getItem('token')
        this.courseserv.create_course(name, this.auth_token)

        window.location.reload();
    }

}




    
