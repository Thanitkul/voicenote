import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { VerifyInterceptor } from './services/verify.interceptor';
import 'boxicons';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: VerifyInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
