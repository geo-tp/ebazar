import { getActiveObjects, getActiveObjectsError, getActiveObjectsSuccess } from "../actions/ObjectActions"
import { urlFormater } from "../utils/urlFormater"


export const fetchActiveObjects = (userId) => {
    return (dispatch) => {
        dispatch(getActiveObjects())

        let url = urlFormater(
                        {model: "object",
                         filter_fields: ['user', "isActive"],
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
                        dispatch(getActiveObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getActiveObjectsError(error))
                    })
    }
}