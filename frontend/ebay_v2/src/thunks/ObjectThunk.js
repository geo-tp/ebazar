import { getObjects, getObjectsSuccess, getObjectsError,
         editObject, editObjectSuccess, editObjectError} from "../actions/ObjectActions"
import { urlFormater } from "../utils/urlFormater"
import {parametersFormater} from "../utils/parametersFormater"



export const fetchObjects = (filter=null) => {
    return (dispatch) => {
        dispatch(getObjects())

        let urlParams = {model: "object"}
        
        if (filter) {
            urlParams = {...urlParams, ...filter}
        }
        let url = urlFormater(
            urlParams
        )

        console.log(url)

        let parameters = parametersFormater("GET")

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error("Error - 404 Not Found")
                        }

                        return rslt.json()
                    })

                    .then((objects) => {
                        dispatch(getObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getObjectsError(error))
                    })
    }
}


export const fetchEditObject = (object) => {
    return (dispatch) => {
        dispatch(editObject())

        let url = urlFormater({
            model: "object",
            pk: object.id
        })

        if (object.mainImage && typeof(object.mainImage == typeof("str"))) {
            delete object.mainImage
        }

        let parameters = parametersFormater("PATCH", object)
        console.log("PARAMS", parameters)

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error("Error - 404 Not Found")
                        }

                        return rslt.json()
                    })

                    .then((objects) => {
                        dispatch(editObjectSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(editObjectError(error))
                    })
    }
}
