import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakComponent } from './speak/speak.component';

const routes: Routes = [
  { path: 'speak', component: SpeakComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
