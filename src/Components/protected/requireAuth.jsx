import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function RequireAuth(props) {
    const user = useSelector(state => state.user);
    console.log('protect',user.userInfo);
    return user.userInfo? <Outlet/> : <Navigate to='/SignIn'/>
}

export default RequireAuth;