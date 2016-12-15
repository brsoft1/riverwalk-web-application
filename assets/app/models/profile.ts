export class Profile {
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public middle_name: string,
        public last_name: string,
        public dob: string,
        public mobile_phone: string,
        public home_phone: string,
        public ssn: string,
        public street_address: string,
        public city_address: string,
        public state_address: string,
        public zip_address: string,
        public cardName: string,
        public cardType: string,
        public cardNumber: string,
        public expMonth: string,
        public expYear: string,
        public cvc: string
    ) {  }
}