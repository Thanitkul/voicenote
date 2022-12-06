import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fp',
  templateUrl: './fp.component.html',
  styleUrls: ['./fp.component.scss']
})
export class FpComponent implements OnInit {

  signinForm = {
    email: '' ,
  }

  constructor(private authServ: AuthenticationService, private router: Router) { }

  route_to: string = ''
  name: string = ''


  ngOnInit(): void {
  }

  submitSignin(){
    console.log(this.signinForm.email)
    this.authServ.signin(this.signinForm).subscribe({
      next: (user:any) => {

      },
      error(err) {
        // console.log(err["error"]["message"])
        alert(err["error"]["message"])

      },
      complete: () => {
        alert("success")        
      }

    })

  }


}
