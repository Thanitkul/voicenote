import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    routeTo: string = ''
    signinForm = {
        email: '',
        password: ''
    }
    constructor(private authServ: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
        this.routeTo = sessionStorage.getItem('role')!
    }

    submitSignin() {
        this.authServ.signin(this.signinForm).subscribe({
            next: (user: any) => {
                this.saveData(user["token"])
            },
            error(err) {
                // console.log(err["error"]["message"])
                alert(err["error"]["message"])

            },
            complete: () => {
                this.router.navigate(['/' + this.routeTo])
            }
        })

    }

    redirectSignup() {
        this.router.navigate(['/authentication/signup'])
    }

    saveData(token: any) {
        sessionStorage.setItem('token', token);
    }

}
