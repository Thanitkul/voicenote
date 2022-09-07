import { Component, OnInit } from '@angular/core';
declare var window: any;
import { CourseService } from '../course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
    course_modal: any;
    userinfo_modal: any;
    searchText: any;
    username: any;
    courses: any;
    
    // Change token here [You need to signup and signin to get token by Thunder client before (only for now)]
    auth_token = sessionStorage.getItem('token')
    
    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.course_modal = new window.bootstrap.Modal(document.getElementById('course_modal'));
        this.userinfo_modal = new window.bootstrap.Modal(document.getElementById('userinfo_modal'));
        this.courseserv.get_course(this.auth_token).subscribe((res: any) => this.courses = res)
        this.courseserv.get_username(this.auth_token).subscribe((res: any) => this.username = res['username'])
        console.log(this.auth_token)
    }
    logout(): void {
        sessionStorage.clear()
    }
    openCourse_modal() {
        this.course_modal.show();
    }
    openUserinfo_modal() {
        this.userinfo_modal.show();
    }
    create() {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        // const token = sessionStorage.getItem('token')
        this.courseserv.create_course(name, this.auth_token)

        window.location.reload();
    }

}




    
