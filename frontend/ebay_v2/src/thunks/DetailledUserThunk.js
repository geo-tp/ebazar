import { getDetailledUser, getDetailledUserError, getDetailledUserSuccess } from "../actions/UserActions"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchDetailledUser = (userId) => {
    return(dispatch) => {
        dispatch(getDetailledUser(userId))

        let url = urlFormater({
            model: "detailled-user",
            pk: userId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error ("Error - 404 Not Found")
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
