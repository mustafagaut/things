const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name doesnt exceed 30 characters"],
        minlength:[4,"Name shoul have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter email address"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[8,"Password must have atleast 8 characters"],
        select:false

    },
    avatar:
        {
            public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:
    {
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
});
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();

    }


    this.password=await bcrypt.hash(this.password,10);

});
//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//Reset password token generator
userSchema.methods.getResetPassword = async function () {
    const resetToken= crypto.randomBytes(20).toString("hex");
    console.log("hello");
}




//jwt token

userSchema.methods.getJWTTokens=function (){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};
userSchema.methods.getResetPasswordToken = async function (){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hashing and adding resetPassword token
    this.resetPasswordToken=crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex"); 

    this.resetPasswordExpire=Date.now()+15*60*1000;
    
    
    return resetToken;

};



module.exports=mongoose.model("User",userSchema);