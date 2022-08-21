import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,  } from './app-routing.module';
import { TranscriptionComponent } from './transcription/transcription.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ng2SearchPipeModule,
        FormsModule
    ],
    providers: [],
})
export class AppModule { }

