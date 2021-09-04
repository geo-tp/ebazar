import { getNextPurchasedTransactionPage, getNextPurchasedTransactionPageError, getNextPurchasedTransactionPageSuccess, 
         getPurchasedTransaction, getPurchasedTransactionError, getPurchasedTransactionSuccess } 
         from "../actions/TransactionActions"
import { API_TRANSACTION } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { fetchNextPage } from "./UtilsThunk"


export const fetchPurchasedTransaction = (userId) => {
    return (dispatch) => {

        dispatch(getPurchasedTransaction())

        let url = urlFormater(
            {
                model: API_TRANSACTION,
                filter_field: "user",
                filter_value: userId
            }
        )

        let parameters = parametersFormater("GET")

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then((purchasedObjects) => {
                        
                        dispatch(getPurchasedTransactionSuccess(purchasedObjects))

                        return 1
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getPurchasedTransactionError(error))

                        return 0
                    })
    }
}

export const fetchNextPurchasedTransactionsPage = (nextUrl) => {
    return fetchNextPage(nextUrl, getNextPurchasedTransactionPage, 
                                  getNextPurchasedTransactionPageError,
                                  getNextPurchasedTransactionPageSuccess)
    
}