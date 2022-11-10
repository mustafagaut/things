import React from 'react'
import {Fragment,useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {useSelector,useDispatch} from 'react-redux';
import './productList.css';
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from  './Sidebar';
import { deleteOrder, getAllOrders,clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const Orders = ({history}) => {
  const dispatch=useDispatch();
  const alert=useAlert();

const deleteProductHandler=(id)=>{
  dispatch(deleteOrder(id));

}

  const{error,orders}=useSelector((state)=>state.allOrders);
  const {error:deleteError,isDeleted}=useSelector((state)=>state.order);

  const columns=[
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.7},
    
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.4,
    },

    {field:'action',headerName:"Action",flex:0.3,minWidth:150,sortable:false,type:'number',
   renderCell:(params)=>{
      return (

        <Fragment>
          <a href={`/admin/order/${params.getValue(params.id,"id")}`}><EditIcon/></a>
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
orders &&orders.forEach((item) => {
  rows.push({
    itemsQty: item.orderItem.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
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
    alert.success("Order Deleted Successfully");
    dispatch({type:DELETE_ORDER_RESET});
    history.push('/admin/order');
  }


dispatch(getAllOrders());

}, [dispatch,error,alert,isDeleted,deleteError,history]);


  return (
    <Fragment>
      <MetaData title={`Admin Orders`}/>
      <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
          <h1 id='productListHeading'>All Orders</h1>
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


export default Orders