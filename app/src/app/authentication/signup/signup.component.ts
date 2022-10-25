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
        username: '',
        dob: '',
        password: ''
    }
    messageError = {
        username: '',
        email: '',
        password: '',
        birthdate: ''
    }

    constructor(private authServ: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
    }

    checkMandatoryInput(): boolean {
        this.messageError = {
            username: '',
            email: '',
            password: '',
            birthdate: ''
        };
        if (!this.signupForm.username) {
            this.messageError.username = 'Username cannot be blank';
            return false;
        } else if(!this.signupForm.email) {
            this.messageError.email = 'Email cannot be blank';
            return false;
        } else if (!this.signupForm.password) {
            this.messageError.password = 'Password cannot be blank';
            return false;
        } else if (!this.signupForm.dob) {
            this.messageError.birthdate = 'Date of birth cannot be blank';
            return false;
        }

        return true;
    }

    register() {
        // console.log(this.signupForm)
        if (this.checkMandatoryInput()) {
            this.authServ.signup(this.signupForm).subscribe({
                next: (user: any) => {
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
    }


    redirectSignin() {
        this.router.navigate(['/authentication/signin']);
    }

    redirect() {
        this.router.navigate(['/']);
    }

    openTos() {
        let newRelativeUrl = this.router.createUrlTree(["tos"]);
        let baseUrl = window.location.href.replace(this.router.url, '');
    
        window.open(baseUrl + newRelativeUrl, '_blank');
    }

    openPp() {
        let newRelativeUrl = this.router.createUrlTree(["pp"]);
        let baseUrl = window.location.href.replace(this.router.url, '');
    
        window.open(baseUrl + newRelativeUrl, '_blank');
    }

}
