import { getDetailledUser, getDetailledUserError, getDetailledUserSuccess } from "../actions/UserActions"
import { API_DETAILLED_USER } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchDetailledUser = (userId) => {
    return(dispatch) => {
        dispatch(getDetailledUser(userId))

        let url = urlFormater({
            model: API_DETAILLED_USER,
            pk: userId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error (NOT_FOUND)
                }

                return rslt.json()
            })

            .then(user => {
                dispatch(getDetailledUserSuccess(user))
            })

            .catch(error => {
                dispatch(getDetailledUserError(error))
            })
    }
}
