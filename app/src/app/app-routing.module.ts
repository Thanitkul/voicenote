import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'authetication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: '', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
    { path: 'speak', loadChildren: () => import('./speak/speak.module').then(m => m.SpeakModule) },
    { path: 'note', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) },
    { path: 'recordings', loadChildren: () => import('./recordings/recordings.module').then(m => m.RecordingsModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
