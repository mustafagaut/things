const { Router } = require('express');
const express= require('express');
const { getAllProducts ,createProduct,updateProduct,deleteProduct, getProduct, ProductReviews, deleteReview, getAdminProducts} = require('../controllers/productController');
const {createProductReview}=require('../controllers/productController');
const { isAuthenticatedUser,authorisedRoles} = require('../middleWare/auth');
const router=express.Router();
router.route('/products').get( getAllProducts);

router.route('/admin/products').get(isAuthenticatedUser,authorisedRoles("admin"),getAdminProducts);

router.route('/admin/product/new').post(isAuthenticatedUser,authorisedRoles("admin"),createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorisedRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorisedRoles("admin"),deleteProduct)



router.route('/product/:id').get(getProduct);
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(isAuthenticatedUser,ProductReviews).delete(isAuthenticatedUser,deleteReview);


module.exports= router;
