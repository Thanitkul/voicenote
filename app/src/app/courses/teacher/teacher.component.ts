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
    deleteModal: any;
    searchText: any;
    username: any = {};
    courses: any;
    deleteId: any;
    name: string = "";
    authToken: string = "";
    
    
    constructor(private courseserv: CourseService) {}

    ngOnInit(): void {
        this.authToken = localStorage.getItem('token')!;
        this.courseModal = new window.bootstrap.Modal(document.getElementById('course_modal'));
        this.userInfoModal = new window.bootstrap.Modal(document.getElementById('userinfo_modal'));
        this.deleteModal = new window.bootstrap.Modal(document.getElementById('delete_modal'));
        this.courseserv.getCourseTeacher().subscribe((res: any) => {this.courses = res});
        this.courseserv.getUsername().subscribe((res: any) => this.username = res);
        
    }
    logout(): void {
        localStorage.clear();
    }
    openCourseModal(): void {
        this.courseModal.show();
    }
    openUserInfoModal(): void {
        this.userInfoModal.show();
    }
    openDeleteModal(id: number): void {
        this.deleteModal.show();
        this.deleteId = id
    }
    create(): void {
        this.courseserv.createCourse(this.name).subscribe(res => {
            this.courseserv.getCourseTeacher().subscribe((res: any) => {this.courses = res})
        });
        this.name = ''
        
        
    }
    delete(confirm: boolean): any {
        if (confirm == true){
            this.courseserv.deleteCourse(this.deleteId).subscribe(res => console.log('successc'))
            this.courses =  this.courses.filter((i:any) => i.id != this.deleteId)
        }
        this.deleteId = ''
    }


}




    
