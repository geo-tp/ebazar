import { getNextSelledTransactionPage, getNextSelledTransactionPageError, getNextSelledTransactionPageSuccess, 
    getSelledTransaction, getSelledTransactionError, getSelledTransactionSuccess } 
    from "../actions/TransactionActions"
import { API_TRANSACTION } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { fetchNextPage } from "./UtilsThunk"


export const fetchSelledTransaction = (userId) => {
    return (dispatch) => {

    dispatch(getSelledTransaction())

    let url = urlFormater(
        {
            model: API_TRANSACTION,
            filter_field: "obj__user",
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

                .then((selledObjects) => {
                    
                    dispatch(getSelledTransactionSuccess(selledObjects))

                    return 1
                })

                .catch((error) => {
                    console.log(error)
                    dispatch(getSelledTransactionError(error))

                    return 0
                })
    }
}

export const fetchNextSelledTransactionsPage = (nextUrl) => {
return fetchNextPage(nextUrl, getNextSelledTransactionPage, 
                             getNextSelledTransactionPageError,
                             getNextSelledTransactionPageSuccess)

}