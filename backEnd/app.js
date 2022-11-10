const express=require('express');
const { builtinModules } = require('module');
const errorMiddleware=require('./middleWare/error');
const catchAsyncError=require('./middleWare/catchAsyncError');
const cookieParser=require('cookie-parser');
const bodyParser= require('body-parser');
const fileUpload=require('express-fileupload');



if(process.env.NODE_ENV!=="PRODUCTION"){
 require('dotenv').config({path:"backEnd/config/config.env"})
  }

//Route imports
const product=require('./routes/productRoute');
const user=require('./routes/userRoute');
const order=require('./routes/orderRoutes');
const payment=require('./routes/paymentRoute');
const app=express();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cookieParser());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(errorMiddleware);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(fileUpload());




module.exports=app;