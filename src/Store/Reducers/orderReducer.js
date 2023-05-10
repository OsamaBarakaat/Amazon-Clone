import { SET_ORDER, RESET_ORDER} from "../Constants/orderConstans";

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORDER:
            console.log(action.payload);
            return {...state, ...action.payload}    

        case RESET_ORDER:
            return null
        default:
            return state;
    }
}