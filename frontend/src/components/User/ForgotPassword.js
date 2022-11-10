import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useState, useEffect } from 'react';
import { forgotPassword,clearErrors } from '../../actions/userAction';
import { useDispatch ,useSelector} from 'react-redux';
import './forgotPassword.css';
import Loader from '../layout/loader/loader';
import { useAlert } from 'react-alert';


const ForgotPassword = () => {
  
    

    const [email, setEmail] = useState("");
    const dispatch=useDispatch();
    const alert=useAlert();
    const { error,message, loading } = useSelector((state) => state.forgotPassword);
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        const userData ={
          email
        }
    
        
        dispatch(forgotPassword(userData));
      };
      useEffect(() => {
        
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
          
    
         
    
          
        }
      }, [dispatch, error, alert, message]);

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="forgotPasswordForm"
              encType="multipart/form-data"
              onSubmit={forgotPasswordSubmit}
            >
              
              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

             
              <input
                type="submit"
                value="send Mail"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword