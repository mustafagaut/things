const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product Description"]

    },
    price:{
        type:Number,    
        required:[true,"please enter product Price"],
        maxLength:[8,"price cannot exceeds 8 characters"]
        
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter product Category"],
    },
    stock:{
        type:Number,
        required:[true,"please enter product Stock"],
        maxLength:[4,"Stocks cannot exceeds 9999"],
        default:1

    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:String,
                ref:"user",
                required:true
        
            },
            name:{
                type:String,
                required:true,

            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }


    }],
    user:{
        type:String,
        ref:"user",
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now

    }

})




module.exports=mongoose.model("Product",productSchema);