import { getEndedObjects, getEndedObjectsError, getEndedObjectsSuccess } from "../actions/ObjectActions"
import { urlFormater } from "../utils/urlFormater"
import {NOT_FOUND} from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { API_OBJECT } from "../utils/apiEndPoints"

export const fetchEndedObjects = (userId) => {
    return (dispatch) => {
        dispatch(getEndedObjects())

        let url = urlFormater(
                        {model: API_OBJECT,
                         filter_fields: ['user', "isActive"],
                         filter_values: [userId, 0]}
        )

        let parameters = parametersFormater("GET")

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then((objects) => {
                        dispatch(getEndedObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getEndedObjectsError(error))
                    })
    }
}