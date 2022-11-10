const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('../middleWare/catchAsyncError');
const ApiFeatures=require('../utils/apiFeatures');
const cloudinary=require('cloudinary');


//create product ->admin
exports.createProduct= catchAsyncError(async (req,res,next)=>{
  
 let images=[];
 if(typeof req.body.images==="string"){
  images.push(req.body.images);
 }else{
  images=req.body.images;
 }
 const imagesLink=[];

for (let i = 0; i < images.length; i++) {
  const result=await cloudinary.v2.uploader.upload(images[i],
    {folder: "products",
    width: 150,
    crop: "scale",
  }
    );
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url,


    })
   

  
}
req.body.images=imagesLink;
req.body.user=req.user.id;


  const product= await Product.create(req.body);
  res.status(201).json({
      success:true,
      product
  });
});


//get all products
exports.getAllProducts= catchAsyncError(async (req,res,next)=>{
  
  const resultPerPage=8;
  const productCount=await Product.countDocuments();
   const apiFeatures=new ApiFeatures(Product.find(),req.query)
   .search()
   .filter()
   let products=await apiFeatures.query;
   let filteredProductsCount=products.length;
   apiFeatures.pagination(resultPerPage);
   products= await apiFeatures.query.clone();
   
   
     
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount

    });
});
//update product ->admin
exports.updateProduct=catchAsyncError(async (req,res,next)=>{
  req.body.user= req.user.id;
    
    let product=await Product.findById(req.params.id);
   
    if(!product){
      return next(new ErrorHandler("product not found",404));

    }
    let images=[];
    if(typeof req.body.images==="string"){
     images.push(req.body.images);
    }else{
     images=req.body.images;
    }
    
    if(images!=undefined){
      const imagesLink=[];
      for (let i = 0; i < product.images.length; i++) {
  
  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    
  }
  
for (let i = 0; i < images.length; i++) {
  const result=await cloudinary.v2.uploader.upload(images[i],
    {folder: "products",
    width: 150,
    crop: "scale",
  }
    );
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url,


    })
   

  
}
req.body.images=imagesLink;


    }





    product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
      success:true,
      Product
    });

  
    
});

//Delete A product
exports.deleteProduct=catchAsyncError(async (req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //de;eting images from cloudinary

  for (let i = 0; i < product.images.length; i++) {
  
  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    
  }


  await product.remove();
  res.status(200).json({
    isDeleted:true,
    message:"product deleted successfully"
  })
  

}
);

// get product details
exports.getProduct=catchAsyncError(async (req,res,next)=>{
  let product= await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("product not found",404));
  } 
  res.status(200).json({
    success:true,
    product


  });
});

//create new review or update the rview
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
 
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  
  const product = await Product.findById(productId);

  let isReviewed=null;
  
  if(product.reviews!==null){
    isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );}

  if (isReviewed!==null) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all reviews of single product
exports.ProductReviews=catchAsyncError(async (req,res,next)=>{
  const product=await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHandler(`product does not exist with id ${req.query.id}`));

  }
  const reviews=product.reviews;
  const rating=product.ratings;
  const no=product.numOfReviews;
  const name=product.name;
  res.status(200).json({
    success:true,
    "Product Reviews":product.reviews
  })
})


exports.deleteReview=catchAsyncError(async (req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler(`product does not exist with id ${req.query.productId}`));

  }

  const reviews=product.reviews.filter(rev=> rev.id.toString()!==req.query.id.toString());
  let avg=0;
reviews.forEach(rev=>{
  avg+=reviews.rating;
})
let ratings=0;
ratings=avg/reviews.length;
if(ratings===NaN){
  console.log("here");
  ratings=0;
}





await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  numOfReviews
},

{
  new:true,
  runValidators:true,
  useFindAndModify:false
})



  res.status(200).json({
    success:true,
    
  })
})


//all product =>admin
exports.getAdminProducts= catchAsyncError(async (req,res,next)=>{
  
  const products= await Product.find();
   res.status(200).json({
        success:true,
        products,
        

    });
});
