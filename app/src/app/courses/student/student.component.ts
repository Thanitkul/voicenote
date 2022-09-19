import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
declare var window: any;


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    addCourse: any;
    userInfoModal: any;
    deleteModal: any;
    searchText: any;
    username: any;
    courses: any;
    deleteId: any;
    authToken: string = '';

    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.authToken = localStorage.getItem('token')!;
        this.userInfoModal = new window.bootstrap.Modal(document.getElementById('userinfo_modal'));
        this.deleteModal = new window.bootstrap.Modal(document.getElementById('delete_modal'));
        this.addCourse = new window.bootstrap.Modal(document.getElementById('addcourse_modal'));
        this.courseserv.getCourseStudent().subscribe((res: any) => {this.courses = res,console.log(this.courses)});
        this.courseserv.getUsername().subscribe((res: any) => this.username = res);
        
    }
    logout(): void {
        localStorage.clear();
    }
    openAddCourse(): void {
        this.addCourse.show();
    }
    openUserInfoModal(): void {
        this.userInfoModal.show();
    }
    openDeleteModal(id: number): void {
        this.deleteModal.show();
        this.deleteId = id
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
    delete(confirm: boolean): any {
        if (confirm == true){
            // this.courseserv.deleteCourse(this.deleteId).subscribe(res => console.log(res))
            // this.courses =  this.courses.filter((i:any) => i.id != this.deleteId)
            console.log("have no function for student to leave course now")
        }
        this.deleteId = ''
    }

}
