import React from 'react'
import {Fragment,useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {useSelector,useDispatch} from 'react-redux';
import './productList.css';
import {clearErrors,getAdminProduct,deleteProduct} from '../../actions/productAction';
import { Link } from '@material-ui/core';
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from  './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({history}) => {
  const dispatch=useDispatch();
  const alert=useAlert();

const deleteProductHandler=(id)=>{
  dispatch(deleteProduct(id));

}

  const{error,products}=useSelector((state)=>state.products);
  const {error:deleteError,isDeleted}=useSelector((state)=>state.product);

  const columns=[
    {field:"id" ,headerName:"Product_ID",minWidth:200,flex:0.5},
    {field:"name",headerName:"Name",minWidth:350,flex:0.8},
    {field:"stock",headerName:"Stock",minWidth:150,flex:0.3},
    {field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
    {field:'action',headerName:"Action",flex:0.3,minWidth:150,sortable:false,type:'number',
   renderCell:(params)=>{
      return (
        <Fragment>
          <a href={`/admin/product/${params.getValue(params.id,"id")}`}><EditIcon/></a>
          <Button 
          onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>

        </Fragment>
      )
    }
  }


  ]
const rows=[];

products &&products.forEach((item) => {
  rows.push({
    id:item._id,
    stock:item.stock,
    price:item.price,
    name:item.name
  });
  
});
useEffect(() => {
  if(error){
    alert.error(error);
    dispatch(clearErrors);
  }
  if(deleteError){
    alert.error(deleteError);
    dispatch(clearErrors);
  }
  if(isDeleted){
    alert.success("Product Deleted Successfully");
    dispatch({type:DELETE_PRODUCT_RESET});
    history.push('/admin/products');
  }


dispatch(getAdminProduct());

}, [dispatch,error,alert,isDeleted,deleteError,history]);


  return (
    <Fragment>
      <MetaData title={`Admin Products  ${products.length}`}/>
      <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
          <h1 id='productListHeading'>All products</h1>
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
          />
        </div>
      </div>

    </Fragment>
  )
}

export default ProductList