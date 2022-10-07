import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

declare let bootstrap: any;


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
    username: any = {};
    courses: any;
    deleteId: any;
    authToken: string = '';

    constructor(private courseserv: CourseService, private router: Router) {}

    ngOnInit(): void {
        this.authToken = localStorage.getItem('token')!;
        this.userInfoModal = new bootstrap.Modal(document.getElementById('userinfo_modal'));
        this.deleteModal = new bootstrap.Modal(document.getElementById('delete_modal'));
        this.addCourse = new bootstrap.Modal(document.getElementById('addcourse_modal'));
        this.courseserv.getCourseStudent().subscribe((res: any) => {this.courses = res,console.log('course:',this.courses)});
        this.courseserv.getUsername().subscribe((res: any) => {this.username = res, console.log(this.username)});
        
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
            this.courseserv.leaveCourse(this.deleteId).subscribe((res: any) => console.log(res))
            this.courses =  this.courses.filter((i:any) => i.id != this.deleteId)
        }
        this.deleteId = ''
    }
    goto(courseId: number, groupId: number, courseName: string) {
        console.log({courseId, groupId})
        this.router.navigateByUrl('/note/' + courseId + '/' + groupId + '?courseName=' + courseName);
    }

}
