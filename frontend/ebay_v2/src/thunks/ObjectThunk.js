import { getObjects, getObjectsSuccess, getObjectsError,
         editObject, editObjectSuccess, editObjectError, 
         getNextObjectPage, getNextObjectPageSuccess, getNextObjectPageError} from "../actions/ObjectActions"
import { urlFormater } from "../utils/urlFormater"
import {parametersFormater} from "../utils/parametersFormater"
import { NOT_FOUND } from "../utils/errors"


// export const fetchObject = (objectId) => {

//     return (dispatch) => {
//         dispatch(getObject())

//         let url = urlFormater({
//             model: "object",
//             pk: objectId,
//         })

//         let params = parametersFormater("GET")

//         return fetch(url, params)
//                 .then(rslt => {

//                     if (!rslt.ok) {
//                         throw new Error(NOT_FOUND)
//                     }

//                     return rslt.json()
//                 })

//                 .then(object => {
//                     dispatch(getObjectSuccess(object))
//                 })

//                 .catch(error => {
//                     dispatch(getObjectError(error))
//                 })
//     }
// }


export const fetchObjects = (filter=null) => {
    return (dispatch) => {
        dispatch(getObjects())

        let urlParams = {model: "object"}
        
        if (filter) {
            urlParams = {...urlParams, ...filter}
        }
        console.log("FILTER", urlParams)
        let url = urlFormater(
            urlParams
        )

        console.log(url)

        let parameters = parametersFormater("GET")

        return fetch(url, parameters)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
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

export const fetchCreateObject = (objectForm) => {

    let url = urlFormater({
        model: "object"
    })

    let params = parametersFormater("POST", objectForm)
    
    return fetch()
}

export const fetchNextObjectsPage = (nextUrl) => {
    return(dispatch) => {
        dispatch(getNextObjectPage())

        let params = parametersFormater("GET")

        return fetch(nextUrl, params)
            .then((rslt )=> {
                console.log("rslt", rslt)
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then((objects) => {
                dispatch(getNextObjectPageSuccess(objects))
            })

            .catch((error) => {
                dispatch(getNextObjectPageError(error))
            })
    }
}