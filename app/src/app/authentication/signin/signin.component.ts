import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { StudentComponent } from 'src/app/courses/student/student.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm = {
    email: '' ,
    password: ''
  }
  constructor(private authServ: AuthenticationService, private router: Router) { }
  route_to: string = ''
  name: string = ''
  

  ngOnInit(): void {
    if (localStorage.getItem('role') == null){
      this.router.navigate(['/authentication/landing'])
    }
    this.route_to = localStorage.getItem('role')!
    this.name = this.route_to.toUpperCase()

  }  

  

  submitSignin(){
    this.authServ.signin(this.signinForm).subscribe({
      next: (user:any) => {
        this.saveData(user["token"])
      },
      error(err) {
        // console.log(err["error"]["message"])
        alert(err["error"]["message"])

      },
      complete: () => {
        this.router.navigate(['/courses/' + this.route_to])
      }
  

    })
      
  }

  redirectSignup() {
    this.router.navigate(['/authentication/signup'])
  }

  redirectLanding() {
    this.router.navigate(['/'])
  }

  saveData(token : any) {
    localStorage.setItem('token', token);
  }

}
