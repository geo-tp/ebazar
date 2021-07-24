import { getDurations, getDurationsError, getDurationsSuccess } from "../actions/DurationActions"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchDurations = () => {
    return (dispatch => {

        dispatch(getDurations)

        let url = urlFormater({
            model: "duration"
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error("Error - 404 Not Found")
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