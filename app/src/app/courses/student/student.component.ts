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
        this.authToken = localStorage.getItem('token')!;
        this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'));
        this.courseserv.getCourseStudent().subscribe((res: any) => {this.courses = res,console.log(this.courses)});
        
    }
    logout(): void {
        localStorage.clear();
    }
    openFormModal(): void {
        this.formModal.show();
    }
    add(): void {
        var code = (<HTMLInputElement>document.getElementById("code")).value;
        this.courseserv.addCourse(code).subscribe((res: any) => {
            if (res.message == "user already joined"){
                alert("You already joined")
            }
            
            this.courseserv.getCourseStudent().subscribe((res: any) => {this.courses = res})
            
            
            
        })

    }

}
