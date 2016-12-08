'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var MerchantConfig = require('./../merchant-config');s

function deleteCustomerShippingAddress(customerProfileId, customerAddressId, callback) {

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(MerchantConfig.AUTHNET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(MerchantConfig.AUTHNET_TRANSACTION_KEY);

	var deleteRequest = new ApiContracts.DeleteCustomerShippingAddressRequest();
	deleteRequest.setMerchantAuthentication(merchantAuthenticationType);
	deleteRequest.setCustomerProfileId(customerProfileId);	
	deleteRequest.setCustomerAddressId(customerAddressId);	

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.DeleteCustomerShippingAddressController(deleteRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.DeleteCustomerShippingAddressResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Successfully deleted a customer shipping profile with id: ' + customerAddressId);
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
	deleteCustomerShippingAddress('12345', '431222', function(){
		console.log('deleteCustomerShippingAddress call complete.');
	});
}

module.exports.deleteCustomerShippingAddress = deleteCustomerShippingAddress;