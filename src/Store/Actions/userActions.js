import { SET_USER, USER_LOGOUT, SET_LOADER} from "../Constants/userConstans";
import axios from 'axios';


export const setUser = (value)=>{
    return{
        type: SET_USER,
        payload:value
    }
}


export const fetchUser = (token)=>{
    return async (dispatch)=>{
        const response = await axios.get('http://localhost:8000/users/user_data',{
            headers: {
              'content-type': 'application/json',
              'authorization':token
            }
          })
          console.log(",mmmmmmmmmmmmmmmm",response);
          dispatch(setUser(response.data.data));
          dispatch(setLoader(false));

    }
}


export const setLoader = (value)=>{
    return{
        type: SET_LOADER,
        payload:value
    }
}