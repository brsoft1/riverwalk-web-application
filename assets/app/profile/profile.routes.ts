import { Routes } from "@angular/router";

import { ProfileComponent }   from './profile.component';

export const PROFILE_ROUTES: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent }
];
