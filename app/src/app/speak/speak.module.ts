import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakRoutingModule } from './speak-routing.module';
import { SpeakComponent } from './speak.component';


@NgModule({
  declarations: [
    SpeakComponent
  ],
  imports: [
    CommonModule,
    SpeakRoutingModule
  ]
})
export class SpeakModule { }
