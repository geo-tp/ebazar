import { getBiddedObjects, getBiddedObjectsError, getBiddedObjectsSuccess,
         getNextBiddedObjectPage, getNextBiddedObjectPageError, getNextBiddedObjectPageSuccess,  } from "../actions/ObjectActions"
import { API_BIDDED_OBJECT_BY_USER } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { fetchNextPage } from "./UtilsThunk"


export const fetchBiddedObjects = (userId) => {
    return (dispatch) => {
        dispatch(getBiddedObjects())

        let url = urlFormater(
                        {model: API_BIDDED_OBJECT_BY_USER,
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
                        dispatch(getBiddedObjectsSuccess(objects))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getBiddedObjectsError(error))
                    })
    }
}

export const fetchNextBiddedObjectsPage = (nextUrl) => {
    return fetchNextPage(nextUrl, getNextBiddedObjectPage, 
                                  getNextBiddedObjectPageError,
                                  getNextBiddedObjectPageSuccess)
    
}
