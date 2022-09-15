import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'speak', loadChildren: () => import('./speak/speak.module').then(m => m.SpeakModule) },
    { path: 'note/:id', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) },
    { path: 'history/:id', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
    { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
    { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
