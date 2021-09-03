import { GET_SELLED_TRANSACTION, GET_SELLED_TRANSACTION_ERROR, GET_SELLED_TRANSACTION_SUCCESS } from "../constants/TransactionConstants";
import { initState } from "./RootReducers";


export const SelledTransactionReducer = (state=initState.selledTransactions, action) => {

    switch (action.type) {
        case GET_SELLED_TRANSACTION:
            return {...state, loading:true}
    
        case GET_SELLED_TRANSACTION_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_SELLED_TRANSACTION_SUCCESS:
            return {...state, loading:false, loaded: true, items:action.payload.transactions}
        default:
            return state;
    }

}