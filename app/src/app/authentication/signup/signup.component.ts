import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = {
    email: '',
    username:'',
    dob:'',
    password:''
  }

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  Register(){
    // console.log(this.signupForm)
    this.authServ.signup(this.signupForm).subscribe({
      next: (user:any) => {
        // console.log(user)
      },
      error(err) {
        // console.log(err["error"])
        alert(err["error"]["message"]["message"])

      },
      complete: () => {
        this.router.navigate(['/authentication/signin'])
      }

    })
  }


  redirect_signin() {
    this.router.navigate(['/authentication/signin']);
  }

  redirect() {
    this.router.navigate(['/']);
  }

}
