import { getUserBalance, getUserBalanceError, getUserBalanceSuccess } from "../actions/BalanceActions"
import { API_BALANCE } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchUserBalance = (userId) => {
    return (dispatch) => {
    dispatch(getUserBalance())

    let url = urlFormater(
                    {model: API_BALANCE,
                     pk: userId}
    )

    let parameters = parametersFormater("GET")

    return fetch(url, parameters)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error(NOT_FOUND)
                    }

                    return rslt.json()
                })

                .then((balance) => {
                    dispatch(getUserBalanceSuccess(balance))
                })

                .catch((error) => {
                    console.log(error)
                    dispatch(getUserBalanceError(error))
                })
    }
}
