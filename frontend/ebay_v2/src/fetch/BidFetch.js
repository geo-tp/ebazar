import { API_BID } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchCreateBid = (price, userId, objectId) => {

    let url = urlFormater({
        model: API_BID
    })

    let params = parametersFormater("POST", {price:price, user:userId, obj:objectId})

    return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        
                        throw new Error(NOT_FOUND)
                    }

                    return rslt.json()
                })

                .then(confirmation => {
                    return 1
                })

                .catch(error => {
                    return error
                })
}

