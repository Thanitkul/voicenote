import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { TranscriptionComponent } from './transcription/transcription.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    LoginComponent,
    CourseComponent,
    TranscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
