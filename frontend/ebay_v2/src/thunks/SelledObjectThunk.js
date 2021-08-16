import { getSelledObjects, getSelledObjectsError, getSelledObjectsSuccess } from "../actions/ObjectActions"
import { API_TRANSACTION } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchSelledObjects = (userId) => {
    return (dispatch) => {
        dispatch(getSelledObjects())

        let url = urlFormater({
            // transaction endpoint with filter to get objects saled by user
            model: API_TRANSACTION,
            filter_field: "obj__user__id",
            filter_value: userId,
            ordering: "-id"

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

                        return 1
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getSelledObjectsError(error))

                        return 0
                    })
    }
}