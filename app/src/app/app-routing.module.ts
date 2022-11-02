import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'speak', loadChildren: () => import('./speak/speak.module').then(m => m.SpeakModule) },
    { path: 'note', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) },
    { path: 'history/:id', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
    { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
    { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    { path: 'archive/:groupId', loadChildren: () => import('./archive/archive.module').then(m => m.ArchiveModule) },
    { path: 'pp', loadChildren: () => import('./pp/pp.module').then(m => m.PpModule) },
    { path: 'tos', loadChildren: () => import('./tos/tos.module').then(m => m.TosModule) },
    { path: 'tutorial', loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule) },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
