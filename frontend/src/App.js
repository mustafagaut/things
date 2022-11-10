import './App.css';
import Header from "./components/layout/header/header.js";
import Footer from "./components/layout/footer/footer.js";
import webFont from 'webfontloader';
import React from 'react';
import { useState } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './components/home/home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js';
import LoginSignUp from './components/User/LoginSignup.js';
import store from './store.js';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdatePassword from './components/User/UpdatePassword.js'
import UpdateProfile from './components/User/UpdateProfile';
import {useHistory} from 'react-router-dom'
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import axios from 'axios';
import Payment  from './components/Cart/Payment.js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSuccess from './components/Order/OrderSuccess.js'
import  MyOrders  from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js'
import Dashboard  from './components/admin/Dashboard.js';
import ProductList from './components/admin/ProductList.js'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct.js';
import Orders from './components/admin/Orders.js';
import UpdateOrder from './components/admin/UpdateOrder.js';
import UserList from './components/admin/UserList.js';
import UpdateUser from './components/admin/UpdateUser.js';

function App() {


  const {isAuthenticated,user}=useSelector(state=>state.user);
 const history=useHistory();
 const [stripeApiKey, setStripeApiKey] = useState("");
 async function getStripeApiKey() {
  const { data } = await axios.get("/api/v1/stripeapikey");

  setStripeApiKey(data.stripeApiKey);
}
 
  React.useEffect(() =>{
  webFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"]
    }
  });
  getStripeApiKey();
  store.dispatch(loadUser());
},[history])

  return (
    <Router>
    <Header/>
    
    {isAuthenticated && <UserOptions user={user}/>}
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/products/:keyword" component={Products} />
    
    <Route exact path="/login" component={LoginSignUp} />
    
    <ProtectedRoute exact path="/account" component={Profile} />
    <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
    <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
    <Route exact path="/password/forgot" component={ForgotPassword}/>
    <Route exact path="/password/reset/:token" component={ResetPassword}/>
    <Route exact path="/cart" component={Cart}/>
    <ProtectedRoute exact path="/shipping" component={Shipping} />
   
    { stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute exact path="/process/payment" component={Payment} />
      </Elements>)}
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      
      <Switch>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>
      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={Orders} />
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
      
      
      
    <Footer/>
    </Router> 
  );
}


export default App;
