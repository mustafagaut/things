import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/loader/loader';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Profile.css'
import { loadUser } from '../../actions/userAction';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const {user,loading,isAuthenticated}=useSelector(state=>state.user);
    const history=useHistory();
    const dispatch=useDispatch();
    
    useEffect(() => {
        if (isAuthenticated === false) {
          history.push("/login");
        }
        dispatch(loadUser);

      }, [history,isAuthenticated,dispatch]);
  return (
    <Fragment>
        {
            loading?<Loader/>:<Fragment>
            <MetaData title={"${user.user.name}s Profile"}/>
            <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                   <img src={user.user.avatar.url} alt={user.name}/>
                    <Link to="/me/update">Edit Profile</Link>
    
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.user.createdAt).substr(0,10)}</p>
                    </div>
                    <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">change Password</Link>
    
                    </div>
    
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
    
  )
}

export default Profile