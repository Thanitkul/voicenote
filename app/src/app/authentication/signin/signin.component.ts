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

    if (this.route_to == "student") {
      document.getElementsByName("who")[0].style.backgroundColor = "#594835"
    }

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
        this.router.navigate(['/' + this.route_to])
      }
  

    })
      
  }

  redirect_signup() {
    this.router.navigate(['/authentication/signup'])
  }

  saveData(token : any) {
    localStorage.setItem('token', token);
  }

}
