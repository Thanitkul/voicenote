import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakRoutingModule } from './speak-routing.module';
import { SpeakComponent } from './speak.component';
import { ListenComponent } from './listen/listen.component';


@NgModule({
  declarations: [
    SpeakComponent,
    ListenComponent
  ],
  imports: [
    CommonModule,
    SpeakRoutingModule
  ]
})
export class SpeakModule { }
