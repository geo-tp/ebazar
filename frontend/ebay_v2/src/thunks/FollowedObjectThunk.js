
import { getFollowedObjects, getFollowedObjectsError, getFollowedObjectsSuccess, 
         getNextFollowedObjectsPage, getNextFollowedObjectsPageError, getNextFollowedObjectsPageSuccess } 
         from "../actions/ObjectActions"
         
import { API_FOLLOWED_OBJECT_BY_USER } from "../utils/apiEndPoints"
import {NOT_FOUND} from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { fetchNextPage } from "./UtilsThunk"



export const fetchFollowedObjects = (userId) => {
    return (dispatch) => {
        dispatch(getFollowedObjects())

        let url = urlFormater(
                        {model: API_FOLLOWED_OBJECT_BY_USER,
                         pk: userId}
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


export const fetchNextFollowedObjectsPage = (nextUrl) => {
    return fetchNextPage(nextUrl, getNextFollowedObjectsPage, 
                                  getNextFollowedObjectsPageError,
                                  getNextFollowedObjectsPageSuccess)
    
}