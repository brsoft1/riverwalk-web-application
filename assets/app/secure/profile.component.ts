import { Component, OnInit }       from '@angular/core';
import { Router }                  from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Auth }                    from './../services/auth.service';
import { Personal }    			       from '../models/personal';
import { Address }    			       from '../models/address';

@Component({
    providers: [ Auth ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    constructor( private router: Router, private auth: Auth, private http: Http  ) { }

// Address form 
	personal = new Personal(this.auth.user.email, this.auth.user.first_name, this.auth.user.middle_name, this.auth.user.last_name, '', '', '', '', '', '');
  personalSubmitted = false;
  	
  private personalSubmit() { 
      this.personalSubmitted = true;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http
      .post('http://localhost:4200/api/updateProfile', 
        this.personal, 
        { headers: headers })
      .map((res:Response) => res.json())
      .subscribe((res)=>{
            //do something with the response here
            console.log(res);
        });
    }
  	
    personalActive = true;

// Address form 
	address = new Address(this.auth.user.email, '', '', '', '');
	
  addressSubmitted = false;
  	
     addressSubmit() { 
      this.addressSubmitted = true; 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http
      .post('http://localhost:4200/api/addAddress', 
        this.address, 
        { headers: headers })
      .subscribe();
    }

  	addressActive = true;
  	states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
    ngOnInit() { }
}
