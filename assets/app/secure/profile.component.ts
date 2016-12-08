import { Component, OnInit }                                    from '@angular/core';
import { Router }                                               from '@angular/router';
import { Http, Response, Headers }                              from '@angular/http';
import {FormGroup, Validators, FormControl }                   from "@angular/forms";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Auth }                                                 from './../services/auth.service';
import { Personal }    			                                from './../models/personal';
import { Address }    			                                from './../models/address';
import {INVALID, VALID} from "@angular/forms/src/model";

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

    emailValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('email').status == VALID) {
            this.toastSuccess("Email Entered", "Email entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    firstNameValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('first_name').status == VALID) {
            this.toastSuccess("First Name Entered", "First name entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    middleNameValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('middle_name').status == VALID) {
            this.toastSuccess("Middle Name Entered", "Middle name entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    lastNameValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('last_name').status == VALID) {
            this.toastSuccess("Last Name Entered", "Last name entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    ssnValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('last_name').status == VALID) {
            this.toastSuccess("SSN Entered", "SSN entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    dobValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('dob').status == VALID) {
            this.toastSuccess("DOB Entered", "DOB entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    mobilePhoneValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('mobile_phone').status == VALID) {
            this.toastSuccess("Mobile Phone Entered", "Mobile phone entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    homePhoneValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('home_phone').status == VALID) {
            this.toastSuccess("Home Phone Entered", "Home phone entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    businessPhoneValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('business_phone').status == VALID) {
            this.toastSuccess("Business Phone Entered", "Business phone entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    faxPhonePhoneValidate(ErrorTitle, ErrorMessage) {
        if (this.personalForm.get('fax_number').status == VALID) {
            this.toastSuccess("Fax Number Entered", "Fax number entered correctly");
        } else {
            this.toastWarning(ErrorTitle, ErrorMessage);
        }
    }

    toastWarning(ErrorTitle, ErrorMessage) {
        var toastOptions:ToastOptions = {
            title: ErrorTitle,
            msg: ErrorMessage,
            showClose: true,
            timeout: 7000,
            theme: 'bootstrap',
            onAdd: (toast:ToastData) => {
                console.log('Toast Warning ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast Warning ' + toast.id + ' has been removed!');
            }
        };
            this.toastyService.warning(toastOptions);
        }

    toastSuccess(SuccessTitle, SuccessMessage) {
        var toastOptions:ToastOptions = {
            title: SuccessTitle,
            msg: SuccessMessage,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast:ToastData) => {
                console.log('Toast Success' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast Success' + toast.id + ' has been removed!');
            }
        };
        this.toastyService.success(toastOptions);
    }
}