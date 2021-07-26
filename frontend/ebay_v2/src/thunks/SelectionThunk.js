import { getSelections, getSelectionsError, getSelectionsSuccess } from "../actions/SelectionActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchSelections = () => {
    return (dispatch) => {
        dispatch(getSelections())

        let url = urlFormater({
            model: "selection"
        })

        let params = parametersFormater('GET')

        return fetch(url, params)
                    .then(rslt => {
                        if(!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then(states => {
                        dispatch(getSelectionsSuccess(states))
                    })

                    .catch(error => {
                        console.log(error)
                        dispatch(getSelectionsError(error))
                    })
    }
}