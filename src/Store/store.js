import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './Reducers/cartReducer';
import { userReducer } from './Reducers/userReducer';
import { orderReducer } from './Reducers/orderReducer';

console.log(userReducer,'fffffffffff');

const reducer = combineReducers({
    cart: cartReducer,
    user:userReducer,
    order:orderReducer
});


const cartItems = localStorage.getItem('cartItems')?
                    JSON.parse(localStorage.getItem('cartItems')):[];

const initState = {
    cart:{cartItems},
    user:{userInfo:null,loader:true},
    order:null
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;