import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
declare var window: any;


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    formModal: any;
    searchText: any;
    username: any;
    courses: any;
    authToken: string = '';

    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.authToken = sessionStorage.getItem('token')!;
        // this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
        this.courseserv.getCourseStudent(this.authToken).subscribe((res: any) => {this.courses = res,console.log(this.courses)});
        
    }
    logout(): void {
        sessionStorage.clear();
    }
    openFormModal(): void {
        this.formModal.show();
    }
    add(): void {
        var code = (<HTMLInputElement>document.getElementById("code")).value;
        this.courseserv.addCourse(code, this.authToken);

        window.location.reload();
    }

}
