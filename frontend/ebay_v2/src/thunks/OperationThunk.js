import { createOperation, createOperationError, createOperationSuccess, getOperations, getOperationsError, getOperationsSuccess } from "../actions/OperationActions"
import { API_OPERATION } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchUserOperations = (userId) => {
    return(dispatch) => {
        dispatch(getOperations(userId))

        let url = urlFormater({
            model: API_OPERATION,
            filter_field: "user",
            filter_value: userId

        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(operations => {
                dispatch(getOperationsSuccess(operations))
            }) 

            .catch(error => {
                dispatch(getOperationsError(error))
            })
    }
}

export const fetchCreateOperation = (userId, paymentMethod, amount) => {

    return(dispatch) => {
        dispatch(createOperation(userId))

        let url = urlFormater({
            model: API_OPERATION,
            filter_field: "user",
            filter_value: userId

        })

        let params = parametersFormater("POST", 
                                        {amount:amount, isWithdrawal:true,
                                         paymentMethod:paymentMethod, user:userId, isType:2})

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(operations => {
                dispatch(createOperationSuccess(operations))
            }) 

            .catch(error => {
                dispatch(createOperationError(error))
            })
    }
}