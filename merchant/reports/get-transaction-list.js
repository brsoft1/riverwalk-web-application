'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var MerchantConfig = require('./../merchant.config');

function getTransactionList(batchId, callback) {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(MerchantConfig.AUTHNET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(MerchantConfig.AUTHNET_TRANSACTION_KEY);

	var paging = new ApiContracts.Paging();
	paging.setLimit(10);
	paging.setOffset(1);

	var sorting = new ApiContracts.TransactionListSorting();
	sorting.setOrderBy(ApiContracts.TransactionListOrderFieldEnum.ID);
	sorting.setOrderDescending(true);

	var getRequest = new ApiContracts.GetTransactionListRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setBatchId(batchId);
	getRequest.setPaging(paging);
	getRequest.setSorting(sorting);


	console.log(JSON.stringify(getRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.GetTransactionListController(getRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetTransactionListResponse(apiResponse);

		console.log(JSON.stringify(response, null, 2));

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
				console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
				if(response.getTransactions() != null){
					var transactions = response.getTransactions().getTransaction();
					for (var i=0;i<transactions.length;i++)
					{
						console.log('Transaction Id : ' + transactions[i].getTransId());
						console.log('Transaction Status : ' + transactions[i].getTransactionStatus());
						console.log('Amount Type : ' + transactions[i].getAccountType());
						console.log('Settle Amount : ' + transactions[i].getSettleAmount());
					}
				}
			}
			else{
				console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
			}
		}
		else{
			console.log('Null Response.');
		}
		
		callback(response);
	});
}

if (require.main === module) {
	getTransactionList('4300033', function(){
		console.log('getTransactionList call complete.');
	});
}

module.exports.getTransactionList = getTransactionList;