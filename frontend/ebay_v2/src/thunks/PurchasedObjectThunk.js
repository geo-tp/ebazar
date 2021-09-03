import { getNextPurchasedObjectsPage, getNextPurchasedObjectsPageError, getNextPurchasedObjectsPageSuccess, 
         getPurchasedObjects, 
         getPurchasedObjectsError, 
         getPurchasedObjectsSuccess } from "../actions/ObjectActions"

import {NOT_FOUND} from "../utils/errors"
import { urlFormater } from "../utils/urlFormater"
import {parametersFormater} from "../utils/parametersFormater"
import { API_PURCHASED_OBJECT_BY_USER, API_TRANSACTION } from "../utils/apiEndPoints"
import { fetchNextPage } from "./UtilsThunk"


export const fetchPurchasedObjects = (userId) => {
    return (dispatch) => {

        dispatch(getPurchasedObjects())

        let url = urlFormater(
            {
                model: API_PURCHASED_OBJECT_BY_USER,
                pk: userId,
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

                    .then((purchasedObjects) => {
                        
                        dispatch(getPurchasedObjectsSuccess(purchasedObjects))

                        return 1
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getPurchasedObjectsError(error))

                        return 0
                    })
    }
}

export const fetchNextPurchasedObjectsPage = (nextUrl) => {
    return fetchNextPage(nextUrl, getNextPurchasedObjectsPage, 
                                  getNextPurchasedObjectsPageError,
                                  getNextPurchasedObjectsPageSuccess)
    
}
