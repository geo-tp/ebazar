import { CREATE_ACCOUNT, CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_SUCCESS, 
         DELETE_ACCOUNT, DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_SUCCESS, 
         GET_CONNECTED, GET_CONNECTED_ERROR, GET_CONNECTED_SUCCESS, 
         GET_DISCONNECTED, GET_DISCONNECTED_ERROR, GET_DISCONNECTED_SUCCESS,
         ACCEPT_COOKIE } from "../constants/AuthConstants";
import { setCookieAccepted, setUserData } from "../utils/cookieHandler";

import { initialState } from "./RootReducers";

export const AuthReducer = (state=initialState.auth, action) => {

    switch (action.type) {

        case GET_CONNECTED:
            return {...state, loading:true}
        
        case GET_CONNECTED_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_CONNECTED_SUCCESS:

            setUserData(action.payload.user, action.payload.token)

            return {...state, loading: false, connected:true, 
                    basicUser: action.payload.user, token: action.payload.token}

        case GET_DISCONNECTED:
            return {...state, loading: true}

        case GET_DISCONNECTED_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case GET_DISCONNECTED_SUCCESS:
            return {...state, loading:false, connected: false, userInfos: {}}


        case CREATE_ACCOUNT:
            return {...state, loading: true}

        case CREATE_ACCOUNT_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case CREATE_ACCOUNT_SUCCESS:
            return {...state, loading: false}


        case DELETE_ACCOUNT:
            return {...state, loading:true}

        case DELETE_ACCOUNT_ERROR:
            return {...state, loading:false, error:action.payload.error}
        
        case DELETE_ACCOUNT_SUCCESS:
            return {...state, loading:false, connected: false, userInfos: {}}

        case ACCEPT_COOKIE:
            setCookieAccepted()
            return {...state, cookieAccept:true}

        default:
            return state
    }
}