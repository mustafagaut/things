const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwtToken=require('jsonwebtoken');
const User=require('../models/userModel');


exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
const {token} =req.cookies;

if(!token){
    return next(new ErrorHandler("please login to access this ",401));

}
    const decodedData=jwtToken.verify(token,process.env.JWT_SECRET);


    req.user=await User.findById(decodedData.id);


    next();

});

exports.authorisedRoles=(...roles)=> {
    return (req,res,next)=>{
       
        
        if(!roles.includes(req.user.role)){
            
           return next(new ErrorHandler(`role ${req.user.role} is not allowed to this resource`,403));

        }
        next();

    }
}