'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var MerchantConfig = require('./../merchant.config');

function createCustomerPaymentProfile(customerProfileId, callback) {
	customerProfileId = "1808388956";
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(MerchantConfig.AUTHNET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(MerchantConfig.AUTHNET_TRANSACTION_KEY);

	var creditCard = new ApiContracts.CreditCardType();
	creditCard.setCardNumber('4485150644232810');
	creditCard.setExpirationDate('0822');

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	var customerAddress = new ApiContracts.CustomerAddressType();
	customerAddress.setFirstName('Nick');
	customerAddress.setLastName('Diaz');
	customerAddress.setAddress('123 Bravo St');
	customerAddress.setCity('Saint Louis');
	customerAddress.setState('MO');
	customerAddress.setZip('61336');
	customerAddress.setCountry('USA');
	customerAddress.setPhoneNumber('817-896-8570');

	var profile = new ApiContracts.CustomerPaymentProfileType();
	profile.setBillTo(customerAddress);
	profile.setPayment(paymentType);
	// profile.setDefaultPaymentProfile(true);

	var createRequest = new ApiContracts.CreateCustomerPaymentProfileRequest();

	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setCustomerProfileId(customerProfileId);
	createRequest.setPaymentProfile(profile);

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.CreateCustomerPaymentProfileController(createRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.CreateCustomerPaymentProfileResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Successfully created a customer payment profile with id: ' + response.getCustomerPaymentProfileId());
			}
			else
			{
				console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
			}
		}
		else
		{
			console.log('Null response received');
		}

		callback(response);
	});
}

if (require.main === module) {
	createCustomerPaymentProfile('41003872',function(){
		console.log('createCustomerPaymentProfile call complete.');
	});
}

module.exports.createCustomerPaymentProfile = createCustomerPaymentProfile;