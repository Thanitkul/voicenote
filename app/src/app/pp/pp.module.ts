import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpRoutingModule } from './pp-routing.module';
import { PpComponent } from './pp.component';


@NgModule({
  declarations: [
    PpComponent
  ],
  imports: [
    CommonModule,
    PpRoutingModule
  ]
})
export class PpModule { }
