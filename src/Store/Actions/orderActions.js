import { SET_ORDER, RESET_ORDER} from "../Constants/orderConstans";


export const setOrder = (value)=>{
    // console.log(value);
    return{
        type: SET_ORDER,
        payload:value
    }
}

export const resetOrder = (value)=>{
    // console.log(value);
    return{
        type: RESET_ORDER
    }
}