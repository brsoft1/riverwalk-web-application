import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule }                       from "@angular/http";

import { Guard }                            from "./services/guard.service";
import { Auth }                             from "./services/auth.service";

import { AppComponent }                     from "./app.component";
//Layouts
import { PublicLayoutComponent }            from './layouts/public-layout.component';
import { SecureLayoutComponent }            from './layouts/secure-layout.component';

import { routing }                          from "./app.routing";

@NgModule({
    declarations: [
        AppComponent,
        PublicLayoutComponent,
        SecureLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [ 
    Guard,
    Auth 
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}