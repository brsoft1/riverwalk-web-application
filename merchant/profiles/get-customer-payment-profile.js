'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var MerchantConfig = require('./../merchant-config');

function getCustomerPaymentProfile(customerProfileId, customerPaymentProfileId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(MerchantConfig.AUTHNET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(MerchantConfig.AUTHNET_TRANSACTION_KEY);

	var getRequest = new ApiContracts.GetCustomerPaymentProfileRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setCustomerProfileId(customerProfileId);
	getRequest.setCustomerPaymentProfileId(customerPaymentProfileId);

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.GetCustomerProfileController(getRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetCustomerPaymentProfileResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Customer Payment Profile ID : ' + response.getPaymentProfile().getCustomerPaymentProfileId());
				console.log('Customer Name : ' + response.getPaymentProfile().getBillTo().getFirstName() + ' ' +
					response.getPaymentProfile().getBillTo().getLastName());
				console.log('Address : ' + response.getPaymentProfile().getBillTo().getAddress());
			}
			else
			{
				//console.log('Result Code: ' + response.getMessages().getResultCode());
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
	getCustomerPaymentProfile('41003872', '37300953', function(){
		console.log('getCustomerPaymentProfile call complete.');
	});
}

module.exports.getCustomerPaymentProfile = getCustomerPaymentProfile;