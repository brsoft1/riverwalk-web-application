import { NgModule }                 from '@angular/core';

import { StreamComponent }       from './stream.component';
import { StreamRoutingModule }   from './stream-routing.module';

@NgModule({
    imports: [
        StreamRoutingModule,
    ],
    declarations: [ StreamComponent ]
})
export class StreamModule { }