import { getOperations, getOperationsError, getOperationsSuccess } from "../actions/OperationActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchOperations = (userId) => {
    return(dispatch) => {
        dispatch(getOperations(userId))

        let url = urlFormater({
            model: "operation",
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