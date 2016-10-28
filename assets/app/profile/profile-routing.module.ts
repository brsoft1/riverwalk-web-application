import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { ProfileComponent }   from './profile.component';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Secure Pages'
        },
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    title: 'Profile Page'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}