const ErrorHandler = require("../utils/errorHandler");
const errorHandler=require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");


module.exports = (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message||"Internal Server error";

    //wrong mongodb id error
    if(err.name==="CastError"){
        const message =`resource not found  ,invalid ${err.path}`;  
        err=new ErrorHandler(message,400);
    }
    if(err.code===11000){
        const message= `duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);

    }
    //json web token error
    if(err.name==="JsonWebTokenError"){
        const message="Json webToken is invalid, Try again"
        err=new ErrorHandler(message,400);
    }

    //jwtExpire error
    if(err.name==="TokenExpiredError"){
        const message="Json webToken is expired, Try again"
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}


