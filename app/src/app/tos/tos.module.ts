import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TosRoutingModule } from './tos-routing.module';
import { TosComponent } from './tos.component';


@NgModule({
  declarations: [
    TosComponent
  ],
  imports: [
    CommonModule,
    TosRoutingModule
  ]
})
export class TosModule { }
