import { GET_PURCHASED_TRANSACTION, GET_PURCHASED_TRANSACTION_ERROR, GET_PURCHASED_TRANSACTION_SUCCESS, 
         GET_SELLED_TRANSACTION, GET_SELLED_TRANSACTION_ERROR, GET_SELLED_TRANSACTION_SUCCESS } 
         from "../constants/TransactionConstants";

export const getPurchasedTransaction = () => ({
    type: GET_PURCHASED_TRANSACTION,
    payload: {}
})

export const getPurchasedTransactionError = (error) = ({
    type: GET_PURCHASED_TRANSACTION_ERROR,
    payload: {error:error}
})

export const getPurchasedTransactionSuccess = (transactions) = ({
    type: GET_PURCHASED_TRANSACTION_SUCCESS,
    payload: {transactions:transactions}
})

export const getSelledTransaction = () => ({
    type: GET_SELLED_TRANSACTION,
    payload: {}
})

export const getSelledTransactionError = (error) = ({
    type: GET_SELLED_TRANSACTION_ERROR,
    payload: {error:error}
})

export const getSelledTransactionSuccess = (transactions) = ({
    type: GET_SELLED_TRANSACTION_SUCCESS,
    payload: {transactions:transactions}
})