const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('../middleWare/catchAsyncError');
const User= require('../models/userModel');
const bcrypt =require('bcryptjs');
const sendToken= require('../utils/jwtToken')
const sendEmail=require("../utils/sendEmail.js")
const crypto=require('crypto');
const cloudinary=require('cloudinary');
//register user

exports.registerUser=catchAsyncError( async(req,res,next)=>{
 
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

       console.log("here"); 
      
      const token=user.getJWTTokens();

      sendToken(user,200,res);
    
});

//login User
exports.loginUser=catchAsyncError(async(req,res,next)=>{
  const {email,password}= req.body;

  //ifuser has given password and email both
  if(!email||!password){
    return next(new ErrorHandler("please enter Email & password",401));
  }
  const user =await User.findOne({email}).select("+password");


    if(!user){
      return next(new ErrorHandler("user not found",401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
    


  if(!isPasswordMatched){
    return next(new ErrorHandler("invalid email or password",401));
  }

  const token =await user.getJWTTokens();

    sendToken(user,201,res);
    

  

})



//logout user
exports.logoutuser= catchAsyncError(async(req,res,next)=>{
  

  res.cookie('token',"null",()=>{
    expires:new Date(date.now());
    httpOnly:true
  })

  res.status(200).json({
    success:true,
    message:"logged out"
  })

})


//forgot password
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
  const user=await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("user not found",404));

  }
    const resetToken= await user.getResetPasswordToken();

    

    user.save({validateBeforeSave:false});

    
    



    const resetPasswordURL=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


    const message=`Your Password reset token is :-\n \n ${resetPasswordURL}  \n\n\n\n If you do not save ignore it `;
    
    console.log(resetPasswordURL);


    try {

      await sendEmail({
        email:user.email,
        subject:'ecommerce password recovery',
        message:message
    });
      res.status(200).json({
        success:true,
        message:`Email send to ${user.email} successfully`
      })

      
    } catch (error) {
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;

      return next(new ErrorHandler(error.message,500))
    }



  
})



//resetPassword
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
  const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex"); 

    console.log(resetPasswordToken);
    

    const user= await User.findOne({
      
        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}

    })
    console.log(user);
  if(!user){
      return next(new ErrorHandler("user not found here",404));
  }
    if(req.body.password!==req.body.confirmedPassword){
      return next(new ErrorHandler("password not match with confirmed password",404));
    }

    user.password=req.body.password;
  
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    user.save();


    res.status(200).json({
      success:true,
        user
    })




}) 
//get user detail
exports.getuserDetail=catchAsyncError(async (req,res,next)=>{

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success :true,
      user
  })
  

});


//change password
exports.updateUserpassword=catchAsyncError(async (req,res,next)=>{

  const user = await User.findById(req.user.id).select("+password");


  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    


  if(!isPasswordMatched){
    return next(new ErrorHandler("old password is invalid",400));
  }
  if(req.body.newPassword!==req.body.confirmPassword)
     {
   return next(new ErrorHandler("password is not match with confirm password",400));
  }


  user.password=req.body.newPassword;
  await user.save();

  sendToken(user,200,res);
  

});

exports.updateUserProfile=catchAsyncError(async (req,res,next)=>{
const newUserData={
  name:req.body.name,
  email:req.body.email,
};
if(req.body.avatar!==""){
  const user= await User.findById(req.user.id);
  
  const imageId=user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  newUserData.avatar = {
    public_id:myCloud.public_id,
    url:myCloud.secure_url
  }
}
const user=await User.findByIdAndUpdate(req.user.id,newUserData,
  {new:true,
  runValidators:true,
useFindAndModify:false});

res.status(200).json({
  success:true,
  user
})
  

});



//get all users
exports.getallUsers=catchAsyncError(async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  })

})

//get single userdetail (admin)
exports.getUserDetail=catchAsyncError(async(req,res,next)=>{
  
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`user not found with id ${req.params.id}`,400));
  }


  res.status(200).json({
    success:true,
    user
  })

})
//update user role  -->admin
exports.updateUserRole=catchAsyncError(async (req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  };
  
  const user=await User.findByIdAndUpdate(req.params.id,newUserData,
    {new:true,
    runValidators:true,
  useFindAndModify:false});
  
  res.status(200).json({
    success:true,
    user
  })
    
  
  });


  //delete user ->admin
  exports.deleteUser=catchAsyncError(async (req,res,next)=>{
    
    const user=await User.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler(`user does not exist with id ${req.params.id}`,400));
    }

    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();
     





    res.status(200).json({
      success:true,
      message:`${user.name} deleted successfully`
    })
      
    
    });


  