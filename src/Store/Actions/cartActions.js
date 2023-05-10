import { CART_ADD_ITEM, CART_REMOVE_ITEM, SET_USER_cart } from "../Constants/cartConstants";
import axios from "axios";


export const setUserCart = (value)=>{
    return{
        type: SET_USER_cart,
        payload:value
    }
}


export const fetchUserCart = (token)=>{
    return async (dispatch)=>{
        try {
            const response = await axios.get('http://localhost:8000/carts/',{
                headers: {
                  'content-type': 'application/json',
                  'authorization':token
                }
              })
              console.log(",mmmmmmmmmmmmmmmmcart",response);

              console.log(",mmmmmmmmmmmmmmmmcart",response.data.cart.cartItems);
              
              dispatch(setUserCart(response.data.cart.cartItems));    
        } catch (error) {
            console.log(error,'eeeeeeeeerrrr');
            if(error.response.data.msg === "Cart Not Found"){
                dispatch(setUserCart([]))
            }
        }
        
    }
}



export const addToCart = (prd)=>{
    return{
        type:CART_ADD_ITEM,
        payload:prd
    }
}


export const rmvToCart = (prdId)=>{
    return{
        type:CART_REMOVE_ITEM,
        payload:prdId
    }
}