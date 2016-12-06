import { Component, OnInit }                                    from '@angular/core';
import { Router }                                               from '@angular/router';
import { Http, Response, Headers }                              from '@angular/http';
import {FormGroup, Validators, FormControl }                   from "@angular/forms";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Auth }                                                 from './../services/auth.service';
import { Personal }    			                                from './../models/personal';
import { Address }    			                                from './../models/address';

@Component({
    providers: [ Auth ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    constructor(private router: Router, private auth: Auth, private http: Http, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }

    personalForm: FormGroup;
    personal = new Personal(this.auth.user.email, this.auth.user.first_name, this.auth.user.middle_name, this.auth.user.last_name, '', '', '', '', '', '');

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
                Validators.pattern("^[a-zA-Zñáéíóúü']{1,30}$")
            ]),
            middle_name: new FormControl(null,[
                Validators.required,
                Validators.pattern("^[a-zA-Zñáéíóúü']{1,30}$")
            ]),

            last_name: new FormControl(null,[
                Validators.required,
                Validators.pattern("^[a-zA-Zñáéíóúü']{1,30}$")
            ]),

            dob : new FormControl (null, [
                Validators.required,
                Validators.pattern("[1][9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[2][0][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
            ]),
            mobile_phone: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"),
            ]),
            home_phone: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")
            ]),

            business_phone: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")
            ]),
            fax_number: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")
            ]),
            ssn: new FormControl(null, [
                Validators.required,
                Validators.pattern("[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")
            ])
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

    getValidate(ErrorTitle, ErrorMessage) {
        var toastOptions:ToastOptions = {
            title: ErrorTitle,
            msg: ErrorMessage,
            showClose: true,
            timeout: 10000,
            theme: 'bootstrap',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        this.toastyService.warning(toastOptions);
    }

    getSuccess(SuccessTitle, SuccessMessage) {
        var toastOptions:ToastOptions = {
            title: SuccessTitle,
            msg: SuccessMessage,
            showClose: true,
            timeout: 10000,
            theme: 'bootstrap',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        this.toastyService.success(toastOptions);
    }
}