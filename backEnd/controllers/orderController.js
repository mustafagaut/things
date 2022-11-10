const Order=require('../models/orderModels');
const product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('../middleWare/catchAsyncError');
const ApiFeatures=require('../utils/apiFeatures');


exports.newOrder=catchAsyncError(async(req,res,next)=>{
    const { shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice }=req.body;

        const order= await Order.create({
        shippingInfo,
        orderItem,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user.id
        });

        res.status(201).json({
            success:true,
            order
        })
})



//get Single Order
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler(`order doesn't exist with id ${req.params.id}`,404));

    }
    res.status(200).json({
        success:true,
        order
    })


});


//getloggedin user order
exports.myOrders=catchAsyncError(async(req,res,next)=>{
    const orders= await Order.find({user:req.user.id});

    
    res.status(200).json({
        success:true,
        orders
    })


})

//get all orders  -->admin
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    const orders= await Order.find();
    let totalAmount=0;
    orders.forEach(order =>{
        totalAmount+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

});

//update order status  -->admin
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`order not found with this id ${req.params.id}`,404));
    }

    if(order.orderStatus==='delivered'){
        return next(new ErrorHandler("you have delivered this order",404));
    }

   if(req.body.status==="delivered"){
    order.orderItem.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);

    });

   }
    order.orderStatus=req.body.status;

    if(req.body.status==="delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
    })

});



async function updateStock (id,quantity){
    const Product = await product.findById(id);
    Product.stock-=quantity;

    await Product.save({validateBeforeSave:false});

}
//delete order
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`order not found with this id ${req.params.id}`,404));
    }
    await order.remove();

    
    res.status(200).json({
        success:true,
    })

})





