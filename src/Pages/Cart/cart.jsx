import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { useSelector } from 'react-redux';
import CartItem from '../../Components/cartItem';
import { calcTotalPrice } from '../../Utils/utils';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const {cartItems} = useSelector(state => state.cart);
    const [TotalPrice, setTotalPrice] = useState(calcTotalPrice(cartItems));
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    // i18n.changeLanguage('ar')

    useEffect(()=>{
        setTotalPrice(calcTotalPrice(cartItems))
    },[cartItems])

    // function calcTotalPrice() {
    //     let totalPrice = 0;
    //     for (let i of cartItems) {
    //         totalPrice += (i.price * i.quantity)
    //     }
    //     return totalPrice;
    // }

    function updateTotalPrice() {
        setTotalPrice(calcTotalPrice(cartItems));
    }

    return (
        <div className='row bg-light cart my-3 mx-0'>
            <div className="col-md-8">
                <div className='cart-header'>
                    <h1>{t('cart.shoppingCart')}</h1>
                    <span>{t('price')}</span>
                </div>
                <hr />

                {
                    cartItems.length?
                    cartItems.map((i,index)=>
                        <CartItem 
                        key={index} 
                        item={i}
                        updateTotalPrice={()=>{updateTotalPrice()}}
                        />
                    )
                    :<p className='h2'>No Items on Cart</p>
                }

                <hr />
                <h3 style={{textAlign:'right'}}>{t('cart.tPrice')}: ${TotalPrice}</h3>
                
            </div>
            <div className="total-price col-md-3 p-2">
                <h3>{t('cart.tPrice')}: ${TotalPrice}</h3>
                <button className='btn btn-warning w-100' onClick={()=>{navigate("/shipping");}}>{t('cart.button')}</button>
            </div>
        </div>
    );
};

export default Cart;