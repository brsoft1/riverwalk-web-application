import { Routes, RouterModule } 	from "@angular/router";

import {Guard}                      from "./services/guard.service";

//Layouts
import { PublicLayoutComponent }    from './layouts/public-layout.component';
import { SecureLayoutComponent }    from './layouts/secure-layout.component';

import { STREAM_ROUTES }            from "./stream/stream.routes";
import { PROFILE_ROUTES }           from "./profile/profile.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/stream', pathMatch: 'full', },
    { path: '', component: PublicLayoutComponent, data: { title: 'Public Views' }, children: STREAM_ROUTES },
    { path: '', component: SecureLayoutComponent, canActivate: [Guard], data: { title: 'Secure Views' }, children: PROFILE_ROUTES }
];



export const routing = RouterModule.forRoot(APP_ROUTES);