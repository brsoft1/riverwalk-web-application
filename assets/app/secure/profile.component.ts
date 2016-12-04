import { Component, OnInit }                from '@angular/core';
import { Router }                           from '@angular/router';
import { Http, Response, Headers }          from '@angular/http';
import { Auth }                             from './../services/auth.service';
import { Personal }    			            from '../models/personal';
import { Address }    			            from '../models/address';
import {FormGroup, Validators, FormControl, FormBuilder} from "@angular/forms";

@Component({
    providers: [ Auth ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor(private _fb: FormBuilder, private router: Router, private auth: Auth, private http: Http) {
    }

    //Personal Form Control
    public personalSubmitted: Boolean = false;
    personalForm: FormGroup;
    personal = new Personal(this.auth.user.email, this.auth.user.first_name, this.auth.user.middle_name, this.auth.user.last_name, '', '', '', '', '', '');

    private personalSubmit() {
        this.personalSubmitted = true;
        console.log('Personal Form Has Been Submitted');
        if (!this.personalForm.valid) {
            console.log('Personal Form Has Been Submitted but is not valid');
        } else {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http
                .post('http://localhost:4200/api/updateProfile',
                    this.personal,
                    {headers: headers})
                .map((res: Response) => res.json())
                .subscribe((res) => {
                    //do something with the response here
                    console.log(res);
                });
        }
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
                {headers: headers})
            .subscribe();
    }

    addressActive = true;
    states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    ngOnInit() {
        this.personalForm = new FormGroup({
            email : new FormControl(this.auth.user.email,Validators.required ),
            first_name: new FormControl(null,[
                Validators.required,
                Validators.pattern("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")
            ]),
            middle_name: new FormControl(null,[
                Validators.required,
                Validators.pattern("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")
            ]),

            last_name: new FormControl(null,[
                Validators.required,
                Validators.pattern("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")
            ]),

            dob : new FormControl (null, Validators.required ),
            mobile_phone: new FormControl(null,Validators.required ),
            home_phone: new FormControl(null,Validators.required ),

            business_phone: new FormControl(null,Validators.required ),
            fax_number: new FormControl(null,Validators.required ),
            ssn: new FormControl(null,Validators.required )
        });
    }

    save(model: Personal, isValid: boolean) {
        if (!isValid) {
            console.log('Personal Form is not valid');
            console.log(model, isValid);
        } else {
            console.log('Personal Form is valid');
            console.log(model, isValid);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http
                .post('http://localhost:4200/api/updateProfile',
                    model,
                    {headers: headers})
                .map((res: Response) => res.json())
                .subscribe((res) => {
                    //do something with the response here
                    console.log(res);
                });
        }
    }
}




