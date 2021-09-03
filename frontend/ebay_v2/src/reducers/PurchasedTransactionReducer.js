import { GET_PURCHASED_TRANSACTION, GET_PURCHASED_TRANSACTION_ERROR, GET_PURCHASED_TRANSACTION_SUCCESS } from "../constants/TransactionConstants";
import { initState } from "./RootReducers";


export const PurchasedTransactionReducer = (state=initState.purchasedTransactions, action) => {

    switch (action.type) {
        case GET_PURCHASED_TRANSACTION:
            return {...state, loading:true}
    
        case GET_PURCHASED_TRANSACTION_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_PURCHASED_TRANSACTION_SUCCESS:
            return {...state, loading:false, loaded: true, items:action.payload.transactions}
        default:
            return state;
    }

}