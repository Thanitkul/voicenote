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

  redirect_teacher() {
    this.router.navigate(['authentication/signin']);
    sessionStorage.setItem('role', "teacher");

  }

  redirect_student() {
    this.router.navigate(['authentication/signin']);
    sessionStorage.setItem('role', "student");

  }

  redirect_signup() {
    this.router.navigate(['authentication/signup'])
  }



}
