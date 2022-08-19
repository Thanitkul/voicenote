import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { TranscriptionComponent } from './transcription/transcription.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        AccountCreationComponent,
        routingComponents
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ng2SearchPipeModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

