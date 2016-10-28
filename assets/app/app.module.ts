import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule }                       from "@angular/http";

import { routing }                          from "./app.routing";

import { Guard }                            from "./services/guard.service";
import { Auth }                             from "./services/auth.service";

import { AppComponent }                     from "./app.component";
//Layouts
import { PublicLayoutComponent }            from './layouts/public-layout.component';
import { SecureLayoutComponent }            from './layouts/secure-layout.component';
import { StreamComponent }                  from './stream/stream.component';
import { ProfileComponent }                 from './profile/profile.component';



@NgModule({
    declarations: [
        AppComponent,
        PublicLayoutComponent,
        SecureLayoutComponent,
        StreamComponent,
        ProfileComponent
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