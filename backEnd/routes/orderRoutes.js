const { Router } = require('express');
const express= require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');


const { isAuthenticatedUser,authorisedRoles} = require('../middleWare/auth');
const router=express.Router();


router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser,authorisedRoles('admin'),getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser,authorisedRoles('admin'),updateOrder)
.delete(isAuthenticatedUser,authorisedRoles('admin'),deleteOrder);






module.exports=router;
