var express = require('express');
var router = express.Router();

var ProfileController = require('./../db/profile-controller');

// pass front end off to Angular2 
router.get('/', function(req, res, next) {
    res.render('index');
});

// api routes
router.post('/api/addAddress', ProfileController.addAddress);
router.post('/api/checkRegister', ProfileController.checkRegister);
router.post('/api/updateProfile', ProfileController.updateProfile);
router.post('/api/updateCreditCard', ProfileController.updateCreditCard);
module.exports = router;
