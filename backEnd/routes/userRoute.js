const express=require('express');
const { registerUser, loginUser, logoutuser, forgotPassword, resetPassword, getuserDetail, updateUserpassword, updateUserProfile, getallUsers, updateUserRole, deleteUser, getUserDetail } = require('../controllers/userController');
const router=express.Router();
const { isAuthenticatedUser,authorisedRoles} = require('../middleWare/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/logout').get(logoutuser);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getuserDetail);
router.route('/password/update').put(isAuthenticatedUser,updateUserpassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorisedRoles('admin'),getallUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorisedRoles('admin'),getUserDetail).put(isAuthenticatedUser,authorisedRoles('admin'),updateUserRole).delete(isAuthenticatedUser,authorisedRoles('admin'),deleteUser);

module.exports=router;