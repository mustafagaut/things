import React, { Fragment, useEffect,useState } from 'react';
import ProductCard from '../home/productCard';
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/loader/loader';
import { useAlert } from 'react-alert';
import './products.css'
import Pagination from 'react-js-pagination';

import { Typography,Slider } from '@material-ui/core';



const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Smartphones",
    "Camera"
]

const Products = ({match}) => {
    const alert=useAlert();
    const dispatch= useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const {loading,error,products,productCount,resultPerPage,filteredProductsCount} =useSelector(state =>state.products);
    const keyword=match.params.keyword;
 
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    }, [dispatch,error,alert,keyword,currentPage,price,category,ratings]);   
       
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

      const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);

      }
    
      let count =filteredProductsCount;
      console.log(filteredProductsCount);
    
  return (
    <Fragment>
    {
         loading ? (
            <Loader/>
        ):(
            
            <Fragment>
              <MetaData title="Products | Things"/>
                <h2 className='productHeading'>Products</h2>
                <div className='products' id='container'>
            
            {  products&& products.map(product=>(
                <ProductCard product={product} key={product.name}/>
                )
            )}
    
        </div>
        
        <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby='range-slider'
              min={0}
              max={25000}


            />
            

            <Typography>
            Category    
            </Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
                <Typography component="legend" >Ratings Above</Typography>
                <Slider
                value={ratings}
                aria-labelledby='continous-slider'
                onChange={(e,newRating)=>{
                    setRatings(newRating);
                }}
                min={0}
                max={5}
                valueLabelDisplay="auto"
                />
            </fieldset>

        </div>



        {resultPerPage <count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

            </Fragment>


        )
    }


</Fragment>
  )
}

export default Products