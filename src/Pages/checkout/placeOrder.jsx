import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import CheckoutSteps from '../../Components/CheckoutSteps'
import { setOrder } from '../../Store/Actions/orderActions'
import { setUserCart } from '../../Store/Actions/cartActions';
import Table from 'react-bootstrap/Table';
import { calcTotalPrice } from '../../Utils/utils';
import axios from 'axios';

const PlaceOrder = () => {
    const [orderInfo,setOrderInfo] = useState(null)
    const {userInfo} = useSelector(state => state.user);
    const {shippingInfo} = useSelector(state => state.order);
    const {cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        const orderItems =  cartItems.map(i=>i.productId);
        const itemsPrice = calcTotalPrice(cartItems);
        const taxPrice = itemsPrice * 0.1;
        const shippingPrice = 70.00;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;
        setOrderInfo({
            name:userInfo.name,
            user:userInfo._id,
            orderItems:[...orderItems],
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
    },[])

    const placeOrderHandler = () => {
        const token = localStorage.getItem("token");

        const bodyObj = {
            shippingInfo,
            ...orderInfo
        }

      axios.post("http://localhost:8000/orders", bodyObj ,{
        headers: {
            'content-type': 'application/json',
            'authorization':token
        }
        })
        .then((response) => {
            console.log(response);
            dispatch(setOrder(response.data.data));
        });


        axios.delete("http://localhost:8000/carts/" ,{
        headers: {
            'content-type': 'application/json',
            'authorization':token
        }
        })
        .then((response) => {
            console.log(response);
            dispatch(setUserCart([]))
        });

        navigate("/payment");
       
    }

    return (
        <>
            <CheckoutSteps signin shipping placeOrder/>

            <div className='row cart py-5 mx-0'>
            <div className="col-md-8 p-3 bg-light">

            <h3 className='text-info'>Cart Items</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item,i)=>(
                            <tr>
                            <td>{i+1}</td>
                            <td><img src={item?.image} width='120px' className='d-block mx-auto'></img></td>
                            <td>{item?.name}</td>
                            <td>{item?.price}$</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.price * item?.quantity}$</td>
                            </tr>    
                        ))}
                        
                    </tbody>
                    </Table>
                    <hr />

                <h3 className='text-info'>Client Information</h3>
                <div>
                    <span className='h5'>Name: </span>
                    <span className='h4'>{userInfo?.name}</span>
                </div>
                <div>
                    <span className='h5'>Email: </span>
                    <span className='h4'>{userInfo?.email}</span>
                </div>

                <hr />
                <h3 className='text-info'>Shipping Information</h3>
                <div>
                    <span className='h5'>Address: </span>
                    <span className='h4'>{shippingInfo?.address}</span>
                </div>
                <div>
                    <span className='h5'>City: </span>
                    <span className='h4'>{shippingInfo?.city}</span>
                </div>
                <div>
                    <span className='h5'>Country: </span>
                    <span className='h4'>{shippingInfo?.country}</span>
                </div>
                <div>
                    <span className='h5'>Mobile: </span>
                    <span className='h4'>{shippingInfo?.phoneNo}</span>
                </div>
                
            </div>
            <div className="total-price col-md-3 p-2 bg-light">
                <h3>Order Summary</h3>
                <table className='table table-hover'>
                <tbody>
                    <tr>
                        <td>Items Price</td>
                        <td>{orderInfo?.itemsPrice.toFixed(2)}$</td>    
                    </tr>
                    <tr>
                        <td>Shipping Price</td>
                        <td>{orderInfo?.shippingPrice.toFixed(2)}$</td>    
                    </tr>
                    <tr>
                        <td>Tax Price</td>
                        <td>{orderInfo?.taxPrice.toFixed(2)}$</td>    
                    </tr>
                    <tr>
                        <td>Total Price</td>
                        <td>{orderInfo?.totalPrice.toFixed(2)}$</td>    
                    </tr>
                </tbody>
                </table>

                <button 
                className='btn btn-warning mb-0 w-100'
                onClick={placeOrderHandler}
                >
                    Place Order
                </button>
            </div>
        </div>
        </>
    )
}

export default PlaceOrder