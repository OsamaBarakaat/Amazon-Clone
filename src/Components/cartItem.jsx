import React, { useState } from 'react';
import Quantity from './quantity';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, rmvToCart } from '../Store/Actions/cartActions';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CartItem = (props) => {
    const {item, updateTotalPrice} = props;
    const user = useSelector(state => state.user);

    const [Qty, setQty] = useState(item.quantity);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();




    const handleClick = (i)=>{
        setQty(i)
        item.quantity = i;
        dispatch(addToCart(item))
        if (user.userInfo) {
            const token = localStorage.getItem("token");
            axios.post('http://localhost:8000/carts/',item,{
                headers: {
                  'content-type': 'application/json',
                  'authorization':token
                }
              })
        }
        updateTotalPrice();
    }

    const removeItem = (id)=>{
        dispatch(rmvToCart(id));
        if (user.userInfo) {
            const token = localStorage.getItem("token");
            axios.delete(`http://localhost:8000/carts/${id}`,{
                headers: {
                  'content-type': 'application/json',
                  'authorization':token
                }
              })
        }
    }

    return (
        <div className="row cart-item p-2 justify-content-between">
            <div className="img col-3 text-center">
                <img src={item.image} alt="" className='w-75'/>
            </div>

            <div className="desc col-6">
                <h4>{item.name}</h4>
                <span className='text-success d-block'>{item.instock && t('inStock')}</span>
                <span className='d-block'>
                    <span style={{fontWeight:'bolder'}}>{t('color')}: </span>
                    {item.color}
                </span>
                <Quantity 
                    num={Qty}
                    handleClick={handleClick}
                    qty={item?.instock}
                />
                
                <div className='m-1'>
                    <span
                    style={{color:'dodgerblue',cursor:'pointer'}}
                    onClick={()=>{removeItem(item.productId)}}
                    >
                        {t('delete')}
                    </span>
                </div>
            </div>

            <div className="img col-2" style={{textAlign:'right'}}>
                <h3>${item.price}</h3>
            </div>


        </div>
    );
};

export default CartItem;