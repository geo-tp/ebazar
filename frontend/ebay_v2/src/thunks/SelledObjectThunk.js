import { getSelledObjects, getSelledObjectsError, getSelledObjectsSuccess } from "../actions/ObjectActions"
import { API_OBJECT } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchSelledObjects = (userId) => {
    return (dispatch) => {
        dispatch(getSelledObjects())

        let url = urlFormater({
            model: API_OBJECT,
            filter_fields: ["user","isSelled"],
            filter_values: [userId, true]

        })

        let parameters = parametersFormater("GET")

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then((objects) => {
                        dispatch(getSelledObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getSelledObjectsError(error))
                    })
    }
}