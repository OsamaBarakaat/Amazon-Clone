import { SET_USER, USER_LOGOUT, SET_LOADER} from "../Constants/userConstans";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, userInfo: action.payload}    

        case USER_LOGOUT:
            return null

        case SET_LOADER:
            return {...state, loader: action.payload}
        default:
            return state;
    }
}