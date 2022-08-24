import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'authetication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: '', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
    { path: 'speak', loadChildren: () => import('./speak/speak.module').then(m => m.SpeakModule) },
    { path: 'note', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) },
    { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
