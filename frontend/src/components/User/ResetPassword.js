import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword, loadUser, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpen from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const ResetPassword = ({history,match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
  
   const [password, setpassword] = useState("");
  
   const [confirmedPassword, setConfirmedPassword] = useState("");
   
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      
      const userData={
        password,
        confirmedPassword
      }
      dispatch(resetPassword(match.params.token,userData));
    };
  
    const ResetPasswordDataChange = (e) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Profile Updated Successfully");
       
  
        history.push("/login");
  
        
      }
    }, [dispatch, error, alert, history, success]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Reset Password || Things" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Set New Password</h2>

            <form
              className="resetPasswordForm"
              encType="multipart/form-data"
              onSubmit={resetPasswordSubmit}
            >
              <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                  />
                </div>
             
              
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
    }

export default ResetPassword