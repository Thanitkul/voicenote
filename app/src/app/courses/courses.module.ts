import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    TeacherComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
    
  ]
})
export class CoursesModule { }
