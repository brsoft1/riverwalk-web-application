import { Routes } from "@angular/router";

import { StreamComponent }   from './stream.component';

export const STREAM_ROUTES: Routes = [
    { path: '', redirectTo: 'stream', pathMatch: 'full' },
    { path: 'stream', component: StreamComponent }
];
