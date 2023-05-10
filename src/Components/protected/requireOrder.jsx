import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function RequireOrder(props) {
    const user = useSelector(state => state.user);
    const {cartItems} = useSelector(state => state.cart);


    if (user.userInfo) {
        if (cartItems.length) {
                return <Outlet/>
        }
        else{
            return <Navigate to='/cart'/>
        }
       
    }
    else{
        return <Navigate to='/SignIn'/>
    }    
}

export default RequireOrder;