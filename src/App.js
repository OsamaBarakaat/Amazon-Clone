import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home/home';
import Footer from './Components/Footer/Footer';
// import CreateAccount from './Pages/CreateAccount/CreateAccount';
import Error from './Pages/notFound/notFound';
// import SignIn from './Pages/SignIn/SignIn';
// import Account from './Pages/Account/Account';
// import Order from "./Pages/Order/Order";

import ProductDetalis from './Pages/Product_Detalis/product_detalis';
import Cart from './Pages/Cart/cart';
import Shipping from "./Pages/checkout/shipping";

import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, setLoader } from "./Store/Actions/userActions";
import { fetchUserCart } from "./Store/Actions/cartActions";
import { Suspense, useEffect } from "react";
import PlaceOrder from "./Pages/checkout/placeOrder";
import Payment from "./Pages/checkout/payment";
import RequireAuth from "./Components/protected/requireAuth";
import RequireShip from "./Components/protected/requireShip";
import RequireOrder from "./Components/protected/requireOrder";
import RequirePay from "./Components/protected/requirePay";
import Loader from "./Components/loader/loader";
import Product from "./Pages/ProtectCategory/product";
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import SignIn from './Pages/SignIn/SignIn';
import Account from './Pages/Account/Account';
import Order from "./Pages/Order/Order";
import Address from "./Pages/Account/Address/Address";
import AddAddress from "./Pages/Account/Address/AddAddress/AddAddress";
import Profile from "./Pages/Account/profile/profile";
import EditProfile from "./Pages/Account/profile/editProfile/editProfile";
import ForgetPassword from "./Pages/Account/forgetPassword/forgetPassword";
import OTP from "./Pages/Account/forgetPassword/OTP/OTP";
import UpdatePasword from "./Pages/Account/updatePassword/updatePassword";


function App() {
  const dispatch = useDispatch()
  const { loader } = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserCart(token))
      dispatch(fetchUser(token))
    }
    else {
      dispatch(setLoader(false));
    }
  }, [])

  return (

    <div className="App">
      {loader ?
        <Loader></Loader>
        :
        <>
          <Suspense fallback={<Loader></Loader>}>
            <Header></Header>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product/:productId' element={<ProductDetalis />} />
              {/* <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Account' element={<Account />} /> */}
              {/* <Route element={<RequireAuth/>}>
          <Route path='/Order' element={<Order />} />
        </Route> */}

              <Route element={<RequirePay />}>
                <Route path="/payment" element={<Payment />} />
              </Route>

              <Route element={<RequireShip />}>
                <Route path="/placeOrder" element={<PlaceOrder />} />
              </Route>

              <Route element={<RequireOrder />}>
                <Route path="/shipping" element={<Shipping />} />
              </Route>

              <Route path='/Category' element={<Product />} />
              <Route path='/CreateAccount' element={<CreateAccount />} />
              <Route path='/SignIn' element={<SignIn />} />
              <Route path='/Account' element={<Account />} />
              <Route path='/Order' element={<Order />} />
              <Route path='/Address' element={<Address />} />
              <Route path='/AddAddress' element={<AddAddress />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/editProfile' element={<EditProfile />} />
              <Route path='/forgetPassword' element={<ForgetPassword />} />
              <Route path='/OTP' element={<OTP />} />
              <Route path='/updatePassword' element={<UpdatePasword />} />

              <Route path='*' element={<Error />} />
            </Routes>

            <div className='footer__div'>
              <Footer />

            </div>
          </Suspense>
        </>
      }

    </div>

  );
}

export default App;
