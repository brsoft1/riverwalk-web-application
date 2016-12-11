export class Payment {
    constructor(
        public id: string,
        public email: string,
        public cardName: string,
        public cardType: string,
        public cardNumber: string,
        public expMonth: string,
        public expYear: string,
        public cvc: string
  ) {  }
}