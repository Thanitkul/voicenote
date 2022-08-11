import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss']
})
export class AccountCreationComponent {

  getinfo(){
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(name);
    console.log(email);
    console.log(password);
  }
}
  
  