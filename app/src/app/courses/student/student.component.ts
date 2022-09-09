import { Component, OnInit } from '@angular/core';
declare var window: any;
import { CourseService } from '../course.service';

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

    // Change token here [You need to signup and signin to get token by Thunder client before (only for now)]
    authToken: string = '';

    constructor(private courseserv: CourseService) {
    }

    ngOnInit(): void {
        // this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
        this.authToken = sessionStorage.getItem('token')!
        this.courseserv.get_course_student(this.authToken).subscribe((res: any) => {this.courses = res,console.log(this.courses)})
    }
    logout(): void {
        sessionStorage.clear()
    }
    openFormModal() {
        this.formModal.show();
    }
    add() {
        var code = (<HTMLInputElement>document.getElementById("code")).value;
        // const token = sessionStorage.getItem('token')
        this.courseserv.add_course(code, this.authToken)

        window.location.reload();
    }

}
