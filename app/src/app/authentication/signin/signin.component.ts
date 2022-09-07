import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
  }

  submitSignin(){
    this.authServ.signin(this.signinForm).subscribe({
      next: (user:any) => {
        this.saveData(user["token"])
      },
      complete: () => {
        this.router.navigate(['/teacher'])
      }

    })
      
  }

  saveData(token : any) {
    sessionStorage.setItem('token', token);
  }

}
