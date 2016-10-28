import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { Auth }      			from './../services/auth.service';

@Component({
	providers: [ Auth ],
    selector: 'app-dashboard',
    templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent implements OnInit {

    constructor( private router: Router, private auth: Auth ) { }

    ngOnInit(): void { }
}



