import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListenComponent } from './listen/listen.component';
import { SpeakComponent } from './speak.component';

const routes: Routes = [{ 
    path: '', 
    component: SpeakComponent 
}, {
    path: 'listen',
    component: ListenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakRoutingModule { }
