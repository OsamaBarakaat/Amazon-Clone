import React, { useState, useEffect } from 'react'
import { countries } from 'countries-list'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import CheckoutSteps from '../../Components/CheckoutSteps'
import { setOrder } from '../../Store/Actions/orderActions'


const Shipping = () => {
    const countriesList = Object.values(countries)

    const {userInfo} = useSelector(state => state.user);
console.log(userInfo);
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [postalCode, setPostalCode] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [country, setCountry] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (userInfo) {
            setStreet(userInfo.address?.street);
            setCity(userInfo.address?.city);
            setCountry(userInfo.address?.country?userInfo.address.country:'Andorra');
            setPostalCode(userInfo.postalCode);
            setPhoneNo(userInfo.phone?userInfo.phone[0]:'');   
        }
    },[userInfo]);    

    const submitHandler = (e) => {
        e.preventDefault()
        let obj={shippingInfo:{
            address:street,
            city,
            country,
            postalCode,
            phoneNo
        }}
        
        dispatch(setOrder(obj));
        navigate("/placeOrder");
    }

    return (
        <>
            <CheckoutSteps signin shipping />

            <div className="row wrapper me-0 mb-5">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg was-validated" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Street</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                                pattern='^[a-zA-Z0-9 ]{3,}$'
                            />
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please Enter Valid Address.</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                pattern='^[a-zA-Z ]{3,20}$'
                            />
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please Enter Valid City.</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => {setPhoneNo(e.target.value)}}
                                required
                                pattern='^\d{7,15}$'
                            />
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please Enter Valid Phone No.</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                pattern='^\d{5}$'
                            />
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please Enter Valid Postal Code.</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Shipping