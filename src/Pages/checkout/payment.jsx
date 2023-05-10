import React, { useEffect, useState } from 'react';
import CheckoutSteps from '../../Components/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux'
import { resetOrder } from '../../Store/Actions/orderActions'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Payment() {
    const [sdkReady, setSdkReady] = useState(false);
    const [showPayment, setShowPayment] = useState(true);
    const order = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(()=>{
        if (showPayment) {
            window.paypal.Buttons({
                createOrder:(data,actions)=>{
                    return actions.order.create({
                        purchase_units:[{
                            amount:{
                                value:1//order.totalPrice
                            }
                        }]
                    })
                },
                onApprove(data,actions){
                    return actions.order.capture().then(detalis=>{
                        // console.log(detalis);
                        if (detalis.status === "COMPLETED") {
                            const token = localStorage.getItem("token");
    
                            axios.put(`http://localhost:8000/orders/${order._id}`, {isPaid:true} ,{
                            headers: {
                                'content-type': 'application/json',
                                'authorization':token
                            }
                            })
                            .then((response) => {
                                console.log("ttttttttttt",response);
                            });
                            setShowPayment(false)
                        }
                    })
                }
            }).render('#paypal-button')            
        }
    },[sdkReady,showPayment])

    // useEffect(()=>() => {
    //     dispatch(resetOrder());
    //   })

    return (
        <>
            <CheckoutSteps signin shipping placeOrder payment={!showPayment}/>
            <div class="container">
            <div class="row">
                {
                showPayment?
                <div class="col-10 col-md-8 mx-auto my-5 p-5 shadow-lg">
                    <h1 className='text-start'>Complete Payment</h1>
                    <h4>Select Method</h4>
                    <button className='btn btn-primary' onClick={()=>{navigate('/Order')}}>Pay Cash</button>
                    <div id='paypal-button'></div>
                </div>:
                <div class="col-10 col-md-8 mx-auto my-5 p-5 shadow-lg">
                    <h3 className='text-start bg-success p-5 text-light'>Payment Completed Successfully</h3>
                    <button 
                        className='btn btn-warning'
                        onClick={()=>{navigate('/Order')}}
                    >
                        Show Orders
                    </button>
                 </div>
            }
                
            </div>
            </div>
        </>
        
    );
}

export default Payment;