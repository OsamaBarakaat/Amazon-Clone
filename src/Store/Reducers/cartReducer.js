import { CART_ADD_ITEM, CART_REMOVE_ITEM, SET_USER_cart } from "../Constants/cartConstants";

export const cartReducer = (state = {cartItems:[]},action)=>{
    switch (action.type) {
        case SET_USER_cart:
            return {...state, cartItems: action.payload};
        case CART_ADD_ITEM:
            const item = action.payload;
            item.quantity = item.instock<item.quantity?item.instock:item.quantity;
            const existItem = state.cartItems.find(i=>i.productId===item.productId);
            let cartItems;

            if (existItem) {
                cartItems = state.cartItems.map(i=>{
                    if (i.productId === existItem.productId) {
                        return item
                    }
                    return i;
                })
            } else {
                cartItems = [...state.cartItems, item];
            }
            if (localStorage.getItem('token')) {
                localStorage.setItem('cartItems',JSON.stringify(cartItems));  
            }

            return{
                ...state,
                cartItems
            }

            case CART_REMOVE_ITEM:
                let cartItemsRmv = state.cartItems.filter(i=>i.productId !== action.payload);

                if (localStorage.getItem('token')) {
                    localStorage.setItem('cartItems',JSON.stringify(cartItemsRmv))
                }
                return{
                    ...state,
                    cartItems:cartItemsRmv
                }

        default:
            return state;
    }
}