import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function RequirePay(props) {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const {cartItems} = useSelector(state => state.cart);


    if (user.userInfo) {
        if (order && order.shippingInfo) {
            console.log('ooooooooooooooooo');
            return <Outlet/>
        }
        else{
            return <Navigate to='/shipping'/>
        }
    }
    else{
        return <Navigate to='/SignIn'/>
    }    
}

export default RequirePay;