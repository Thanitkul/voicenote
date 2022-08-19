import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  getinfo(){

    let response = ""
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let token = "";
    let rem = (<HTMLInputElement>document.getElementById("rem")).checked;


    if(rem == true){
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('password',password);
    }
    else{
      console.log("not checked");      
    } 
    
    axios.post('http://localhost:3000/auth/signin', {
        email: email,
        password : password
      })
      .then(function (response) {
        sessionStorage.setItem('token',response.data["token"]);
        console.log(response);
        console.log(email);
      })

  }
    
  
}




