import { GET_USER_BALANCE, GET_USER_BALANCE_ERROR, GET_USER_BALANCE_SUCCESS } from "../constants/BalanceConstants";
import { initialState } from "./RootReducers";

export const BalanceReducer = (state=initialState.userBalance, action) => {

    switch (action.type) {
        case GET_USER_BALANCE:
            return {...state, loading:true}
        
        case GET_USER_BALANCE_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_USER_BALANCE_SUCCESS:
            return {...state, loading:false, loaded:true, item:action.payload.balance}

        default:
            return state
    }
}