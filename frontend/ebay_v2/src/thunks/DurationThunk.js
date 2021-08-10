import { getDurations, getDurationsError, getDurationsSuccess } from "../actions/DurationActions"
import { API_DURATION } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchDurations = () => {
    return (dispatch => {

        dispatch(getDurations)

        let url = urlFormater({
            model: API_DURATION
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error(NOT_FOUND)
                    }

                    return rslt.json()
                })

                .then(durations => {
                    dispatch(getDurationsSuccess(durations))
                })

                .catch(error => {
                    dispatch(getDurationsError(error))
                })
    })
}