import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'authetication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: '', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
