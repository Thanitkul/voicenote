import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { SpeakComponent } from './speak/speak.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'speak', component: SpeakComponent },
    { path: 'course', component: CourseComponent },
    { path: 'register', component: AccountCreationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SpeakComponent, CourseComponent, AccountCreationComponent]