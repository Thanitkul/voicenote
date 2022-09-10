import { Component, OnInit } from '@angular/core';
declare var window: any;
import { CourseService } from '../course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
    courseModal: any;
    userInfoModal: any;
    searchText: any;
    username: any;
    courses: any;
    authToken: string = "";
    
    
    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.authToken = sessionStorage.getItem('token')!;
        this.courseModal = new window.bootstrap.Modal(document.getElementById('course_modal'));
        this.userInfoModal = new window.bootstrap.Modal(document.getElementById('userinfo_modal'));
        this.courseserv.getCourseTeacher(this.authToken).subscribe((res: any) => this.courses = res);
        this.courseserv.getUsername(this.authToken).subscribe((res: any) => this.username = res['username']);
    }
    logout(): void {
        sessionStorage.clear();
    }
    openCourseModal(): void {
        this.courseModal.show();
    }
    openUserInfoModal(): void {
        this.userInfoModal.show();
    }
    create(): void {
        var name = (<HTMLInputElement>document.getElementById("name")).value;
        this.courseserv.createCourse(name, this.authToken);
        window.location.reload();
    }

}




    
