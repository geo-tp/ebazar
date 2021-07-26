import { CREATE_ACCOUNT, CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_SUCCESS, 
         DELETE_ACCOUNT, DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_SUCCESS, 
         EDIT_ACCOUNT, EDIT_ACCOUNT_ERROR, EDIT_ACCOUNT_SUCCESS, 
         GET_ACCOUNT, GET_ACCOUNT_ERROR, GET_ACCOUNT_SUCCESS, 
         GET_CONNECTED, GET_CONNECTED_ERROR, GET_CONNECTED_SUCCESS, 
         GET_DISCONNECTED, GET_DISCONNECTED_ERROR, GET_DISCONNECTED_SUCCESS,
         ACCEPT_COOKIE } from "../constants/AuthConstants";

import { initialState } from "./RootReducers";

export const AuthReducer = (state=initialState.auth, action) => {

    switch (action.type) {

        case GET_CONNECTED:
            return {...state, loading:true}
        
        case GET_CONNECTED_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_CONNECTED_SUCCESS:
            return {...state, loading: false, connected:true, 
                    userInfos: action.payload.userAndToken}

        case GET_DISCONNECTED:
            return {...state, loading: true}

        case GET_DISCONNECTED_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case GET_DISCONNECTED_SUCCESS:
            return {...state, loading:false, connected: false, userInfos: {}}

        case GET_ACCOUNT:
            return {...state, loading: true}

        case GET_ACCOUNT_ERROR:
            return {...state, loading: false, error:action.payload.error}
        
        case GET_ACCOUNT_SUCCESS:
            return {...state, loading: false, 
                    userInfos:action.payload.userAndToken}

        case CREATE_ACCOUNT:
            return {...state, loading: true}

        case CREATE_ACCOUNT_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case CREATE_ACCOUNT_SUCCESS:
            return {...state, loading: false}

        case EDIT_ACCOUNT:
            return {...state, loading: true}

        case EDIT_ACCOUNT_ERROR:
            return {...state, loading: false, error:action.payload.error}
        
        case EDIT_ACCOUNT_SUCCESS:

            let userInfos = {...state.userInfos, user:action.payload.user}

            let newUserInfos = {...userInfos, userInfos}

            return {...state, loading: false, userInfos:newUserInfos}

        case DELETE_ACCOUNT:
            return {...state, loading:true}

        case DELETE_ACCOUNT_ERROR:
            return {...state, loading:false, error:action.payload.error}
        
        case DELETE_ACCOUNT_SUCCESS:
            return {...state, loading:false, connected: false, userInfos: {}}

        case ACCEPT_COOKIE:
            return {...state, cookieAccept:true}

        default:
            return state
    }
}