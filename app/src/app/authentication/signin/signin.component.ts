import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  constructor(private authServ: AuthenticationService) { }

  ngOnInit(): void {
  }

  submitSignin(){
    this.authServ.signin(this.signinForm).subscribe({
      next: (user:any) => {
        this.saveData(user["token"])
      },
      complete: () => {

      }

    })
      
  }

  saveData(token : any) {
    sessionStorage.setItem('tolkien', token);
  }

}
