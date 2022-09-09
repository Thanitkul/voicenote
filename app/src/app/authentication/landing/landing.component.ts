import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TeacherComponent } from 'src/app/courses/teacher/teacher.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    redirectTeacher() {
        sessionStorage.setItem('role', "teacher");
        this.router.navigate(['authentication/signin']);

    }

    redirectStudent() {
        sessionStorage.setItem('role', "student");
        this.router.navigate(['authentication/signin']);

    }

    redirectSignup() {
        this.router.navigate(['authentication/signup'])
    }



}
