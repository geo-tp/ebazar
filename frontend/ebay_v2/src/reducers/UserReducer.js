import { EDIT_USER, EDIT_USER_ERROR, EDIT_USER_SUCCESS, 
         GET_DETAILLED_USER, GET_DETAILLED_USER_ERROR, GET_DETAILLED_USER_SUCCESS, 
         GET_USER, GET_USER_ERROR, GET_USER_SUCCESS } from "../constants/UserConstants";
import { initialState } from "./RootReducers";


export const UserReducer = (state=initialState.user, action) => {

    switch (action.type) {

        case GET_USER:
            return {...state, loading: true}

        case GET_USER_ERROR:
            return {...state, loading: false, error:action.payload.error}
        
        case GET_USER_SUCCESS:
            return {...state, loading: false, 
                    user:action.payload.user}

        case GET_DETAILLED_USER:
            return {...state, loading: true}

        case GET_DETAILLED_USER_ERROR:
            return {...state, loading: false, error:action.payload.error}
        
        case GET_DETAILLED_USER_SUCCESS:
            return {...state, loading:false, user:action.payload.user}

        case EDIT_USER:
            return {...state, loading: true}

        case EDIT_USER_ERROR:
            return {...state, loading: false, error:action.payload.error}
        
        case EDIT_USER_SUCCESS:

            let userInfos = {...state.userInfos, user:action.payload.user}

            let newUserInfos = {...userInfos, userInfos}

            return {...state, loading: false, userInfos:newUserInfos}
        default:
            return state
    }
}