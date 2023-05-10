import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ signin, shipping, placeOrder, payment}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {signin ? <div className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Signin</div>
                <div className="triangle-active"></div>
            </div> : <div disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Signin</div>
                    <div className="triangle-incomplete"></div>
                </div>}

            {shipping ? <Link to='/shipping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

            {placeOrder ? <Link to='/placeOrder' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Place Order</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Place Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

                {payment ? <Link to='/placeOrder' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>}
        </div>
    )
}

export default CheckoutSteps