import React, { Fragment ,useEffect,useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReviews } from '../../actions/productAction'
import ReviewCard from './reviewcard.js'
import Loader from '../layout/loader/loader'
import { useAlert } from 'react-alert'
import MetaData from "../layout/MetaData";
import { addItemsToCart } from '../../actions/cartAction';
import Rating from '@material-ui/lab/Rating'


import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const ProductDetails = ({match}) => {
    
    const dispatch=useDispatch();
    const alert=useAlert();
    const data=useSelector(state=>state.productDetails)
   

    const product=data.product;
    const loading=data.loading;
    const error=data.error;

    const { success,error:reviewError}=useSelector((state)=>state.newReview);
    


    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    function increaseQuantity(){
        if(product.stock>=quantity) return;
        const qty = quantity+1;
        setQuantity(qty);
    }

    function decreaseQuantity(){
        if(quantity<1) return;
        const qty = quantity-1;
        setQuantity(qty);
    }
    const addToCartHandler=()=>{
        dispatch(addItemsToCart(match.params.id,quantity));
        alert.success("item added to Cart");
    }
    const submitReviewToggle=()=>{
        open?setOpen(false):setOpen(true);

    }
    const reviewSubmitHandler=()=>{
        const myForm=new FormData();
        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",match.params.id);
        
        const productId= match.params.id;
        const reviewData =
         {rating:rating, comment:comment, productId:productId};
        
        dispatch(newReviews(reviewData));
        setOpen(false);
    }
    
    useEffect(() => {
        if(error){
           alert.error(error);
           dispatch(clearErrors());

        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
 
         }
         if(success){
            alert.success("Review Submitted successfully");
            dispatch({type:NEW_REVIEW_RESET});
         }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch,match.params.id,alert,error,reviewError,success]);
    const options={
        
        value:product.ratings,
        readOnly:true,
        size:"large",
        precision:0.5
    
    }
    
  return (
    <Fragment>
    { loading ? (
        <Loader/>
    ):(


   <Fragment>
     <MetaData title={`${product.name} | Things`}/>
    <div className='ProductDetails'>
       
           <Carousel>
                {
                product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))
                  }
              </Carousel>
            
        
        <div>
            <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product id {product._id}</p>
                
            </div>
            <div className='detailsBlock-2'>
                <Rating {...options}/>
                <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className='detailsBlock-3'>
                <h1>{`${product.price} `}</h1>
                <div className='detailsBlock-3-1'>
                    <div className='detailsBlock-3-1-1'>
                        <button onClick={decreaseQuantity}>-</button>
                        <input type="number" name="" value={quantity}  readOnly/>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    {``}
                    <button disabled={product.stock<1?false:true} onClick={addToCartHandler}>Add to Cart</button>
                    
                </div>
                <p>
                Status :{""}
                    <b className={product.stock<1 ? "redColor": "greenColor"}>
                        {product.stock<1?"Out of Stock":"In Stock"}
                    </b>
                
                  </p>
            </div>

            <div className='detailsBlock-4'>
                Description : <p> {product.description}</p>

                
            </div>

            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
        </div>
    </div>
    <h3 className='reviewHeading'>Reviews</h3>
                  <Dialog
                  aria-label='simple-dialog-title'
                  open={open}
                  onClose={submitReviewToggle}
                  >

                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className='submitDialog'>
                    <Rating onChange={(e)=>setRating(e.target.value)}
                    value={rating}
                    size="large"/>
                    <textarea
                   className=' submitDialogTextArea'
                   rows="5"
                   cols="30"
                   value={comment}
                   onChange={(e)=>setComment(e.target.value)}>

                   </textarea>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                
            </DialogActions>






                  </Dialog>




    { product.reviews && product.reviews[0]?(
        <div className='reviews'>
            {product.reviews&&product.reviews.map((review)=><ReviewCard review={review}/>)}
            
        </div>
    ):(
        <p className='noReviews'>No Reviews Yet</p>

    )
    
    
    }

   </Fragment>
   ) }
   </Fragment>
    
  )
}

export default ProductDetails