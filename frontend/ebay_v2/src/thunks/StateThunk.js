import { getStates, getStatesError, getStatesSuccess } from "../actions/StateActions"
import { API_STATE } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchStates = () => {
    return(dispatch) => {
        dispatch(getStates())

        let url = urlFormater({
            model: API_STATE
        })

        let params = parametersFormater('GET')

        return fetch(url, params)
            .then(rslt => {
                console.log("RSLT", rslt)
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then((states) => {
                dispatch(getStatesSuccess(states))
            })

            .catch(error => {
                dispatch(getStatesError(error))
            })
    }
}