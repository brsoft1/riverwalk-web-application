import { Routes, RouterModule } 	from "@angular/router";

import {Guard}                      from "./services/guard.service";

//Layouts
import { PublicLayoutComponent }    from './layouts/public-layout.component';
import { SecureLayoutComponent }    from './layouts/secure-layout.component';

const APP_ROUTES: Routes = [
    {
        path: 'profile',
        component: SecureLayoutComponent,
        data: {
            title: 'Secure Views'
        },
        children: [
            {
                path: 'Profile',
                loadChildren: 'profile/profile.module#ProfileModule'
            }
        ]
    },
    {
        path: '',
        component: PublicLayoutComponent,
        data: {
            title: 'Public Views'
        },
        children: [
            {
                path: 'stream',
                loadChildren: 'stream/stream.module#StreamModule',
            }
        ]
    }
];



export const routing = RouterModule.forRoot(APP_ROUTES);