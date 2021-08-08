
import { getFollowedObjects, getFollowedObjectsError, getFollowedObjectsSuccess } from "../actions/ObjectActions"
import {NOT_FOUND} from "../utils/errors"


export const fetchEndedObjects = (userId) => {
    return (dispatch) => {
        dispatch(getFollowedObjects())

        let url = urlFormater(
                        {model: "followed-object",
                         filter_field: 'user',
                         filter_values: userId}
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
                        dispatch(getFollowedObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getFollowedObjectsError(error))
                    })
    }
}