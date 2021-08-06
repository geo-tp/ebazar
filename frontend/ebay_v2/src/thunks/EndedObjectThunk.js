import { getEndedObjects, getEndedObjectsError, getEndedObjectsSuccess } from "../actions/ObjectActions"
import { urlFormater } from "../utils/urlFormater"


export const fetchEndedObjects = (userId) => {
    return (dispatch) => {
        dispatch(getEndedObjects())

        let url = urlFormater(
                        {model: "object",
                         filter_fields: ['user', "isEnded"],
                         filter_values: [userId, 1]}
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