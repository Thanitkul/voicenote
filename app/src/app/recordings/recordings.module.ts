import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingsRoutingModule } from './recordings-routing.module';
import { RecordingsComponent } from './recordings.component';


@NgModule({
  declarations: [
    RecordingsComponent
  ],
  imports: [
    CommonModule,
    RecordingsRoutingModule
  ]
})
export class RecordingsModule { }
