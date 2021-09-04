import { GET_NEXT_PURCHASED_TRANSACTION_PAGE, GET_NEXT_PURCHASED_TRANSACTION_PAGE_ERROR, GET_NEXT_PURCHASED_TRANSACTION_PAGE_SUCCESS, GET_NEXT_SELLED_TRANSACTION_PAGE,GET_NEXT_SELLED_TRANSACTION_PAGE_SUCCESS, GET_NEXT_SELLED_TRANSACTION_PAGE_ERROR, GET_PURCHASED_TRANSACTION, GET_PURCHASED_TRANSACTION_ERROR, GET_PURCHASED_TRANSACTION_SUCCESS, 
         GET_SELLED_TRANSACTION, GET_SELLED_TRANSACTION_ERROR, GET_SELLED_TRANSACTION_SUCCESS } 
         from "../constants/TransactionConstants";

export const getPurchasedTransaction = () => ({
    type: GET_PURCHASED_TRANSACTION,
    payload: {}
})

export const getPurchasedTransactionError = (error) => ({
    type: GET_PURCHASED_TRANSACTION_ERROR,
    payload: {error:error}
})

export const getPurchasedTransactionSuccess = (transactions) => ({
    type: GET_PURCHASED_TRANSACTION_SUCCESS,
    payload: {transactions:transactions}
})

export const getNextPurchasedTransactionPage = () => ({
    type: GET_NEXT_PURCHASED_TRANSACTION_PAGE,
    payload: {}
})

export const getNextPurchasedTransactionPageError = (error) => ({
    type: GET_NEXT_PURCHASED_TRANSACTION_PAGE_ERROR,
    payload: {error:error}
})

export const getNextPurchasedTransactionPageSuccess = (transactions) => ({
    type: GET_NEXT_PURCHASED_TRANSACTION_PAGE_SUCCESS,
    payload: {transactions:transactions}
})


export const getSelledTransaction = () => ({
    type: GET_SELLED_TRANSACTION,
    payload: {}
})

export const getSelledTransactionError = (error) => ({
    type: GET_SELLED_TRANSACTION_ERROR,
    payload: {error:error}
})

export const getSelledTransactionSuccess = (transactions) => ({
    type: GET_SELLED_TRANSACTION_SUCCESS,
    payload: {transactions:transactions}
})

export const getNextSelledTransactionPage = () => ({
    type: GET_NEXT_SELLED_TRANSACTION_PAGE,
    payload: {}
})

export const getNextSelledTransactionPageError = (error) => ({
    type: GET_NEXT_SELLED_TRANSACTION_PAGE_ERROR,
    payload: {error:error}
})

export const getNextSelledTransactionPageSuccess = (transactions) => ({
    type: GET_NEXT_SELLED_TRANSACTION_PAGE_SUCCESS,
    payload: {transactions:transactions}
})


