import { getObjects, getObjectsSuccess, getObjectsError,
         editObject, editObjectSuccess, editObjectError, 
         getNextObjectPage, getNextObjectPageSuccess, getNextObjectPageError, 
         getNextFollowedObjectPage, getNextFollowedObjectPageSuccess, getNextFollowedObjectPageError, 
         getBiddedObjects, getBiddedObjectsError, getBiddedObjectsSuccess, 
         getNextFollowedObjectsPage, getNextFollowedObjectsPageError, getNextFollowedObjectsPageSuccess, 
         getNextBiddedObjectPage, getNextBiddedObjectPageSuccess, getNextBiddedObjectPageError
        } from "../actions/ObjectActions"

import { urlFormater } from "../utils/urlFormater"
import {parametersFormater} from "../utils/parametersFormater"
import { NOT_FOUND } from "../utils/errors"
import { API_OBJECT } from "../utils/apiEndPoints"
import { fetchNextPage } from "./UtilsThunk"


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

        let urlParams = {model:API_OBJECT}
        
        if (filter) {
            urlParams = {...urlParams, ...filter}
        }
        let url = urlFormater(
            urlParams
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
    return fetchNextPage(nextUrl, getNextObjectPage, 
                                  getNextObjectPageError,
                                  getNextObjectPageSuccess)
    
}

