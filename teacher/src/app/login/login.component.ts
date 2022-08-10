import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  insertInfo(){
    let email = sessionStorage.getItem('email');
    let password = sessionStorage.getItem('password');

  }

  getinfo(){
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let rem = (<HTMLInputElement>document.getElementById("rem")).checked;

    if(rem == true){
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('password',password);
    }
    else{
      console.log("not checked");      
    } 
  }
    
  
}




