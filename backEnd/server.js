


const app=require('./app');
const cloudinary=require('cloudinary');


const connectDataBase=require('./config/database');
//handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to uncaught error`);
    process.exit(1);

})



//config


if(process.env.NODE_ENV!=="PRODUCTION"){


  require('dotenv').config({path:"backEnd/config/config.env"})
}
//connecting to db
connectDataBase();


  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);

});



//unhandled promise  rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });




