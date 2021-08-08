import { getPurchasedObjects, 
         getPurchasedObjectsError, 
         getPurchasedObjectsSuccess } from "../actions/ObjectActions"

import {NOT_FOUND} from "../utils/errors"
import { urlFormater } from "../utils/urlFormater"
import {parametersFormater} from "../utils/parametersFormater"


export const fetchPurchasedObjects = (userId) => {
    return (dispatch) => {

        dispatch(getPurchasedObjects())

        let url = urlFormater(
            {
                model: "purchased-object",
                filter_field: "user",
                filter_value: userId
            }
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
                        dispatch(getPurchasedObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getPurchasedObjectsError(error))
                    })
    }
}