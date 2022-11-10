const mongoose=require('mongoose');
const db="mongodb+srv://mustafa:m@cluster0.ucgodga.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connectDataBase=( )=>{
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log(err);
});
}
module.exports=connectDataBase;