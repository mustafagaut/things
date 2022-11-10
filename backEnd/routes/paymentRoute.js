
const express=require('express');
const router= express.Router();
const { isAuthenticatedUser,authorisedRoles} = require('../middleWare/auth');
const {processPayment, sendStripeApiKey}=require('../controllers/paymentController')

router.route("/payment/process").post(isAuthenticatedUser,processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey);




module.exports=router;
