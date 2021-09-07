import { API_FOLLOWED_OBJECT } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchCreateFollowing = (userId, objectId) => {

    let url = urlFormater({
        model: API_FOLLOWED_OBJECT
    })

    let params = parametersFormater("POST", {user:userId, obj:objectId})

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

export const fetchFollowing = (userId, objectId) => {

    let url = urlFormater({
        model: API_FOLLOWED_OBJECT,
        filter_fields: ["user", "obj"],
        filter_values: [userId, objectId]
    })

    let params = parametersFormater("GET")

    return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error(NOT_FOUND)
                    }

                    return rslt.json()
                })

                .then(following => {
                    return  {following:following}
                })

                .catch(error => {
                    return {error:error}
                })
}

export const fetchRemoveFollowing = async (userId, objectId) => {
    
    let rslt = await fetchFollowing(userId, objectId)
    if (rslt.hasOwnProperty("following")) {
        
        let url = urlFormater({
            model: API_FOLLOWED_OBJECT,
            pk: await rslt.following.results[0].id
        })

        let params = parametersFormater("DELETE")

        return fetch(url, params)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }
                    })

                    .then(() => {
                        return 1
                    })

                    .catch(error => {
                        return {error:error}
                    })
    }

    return rslt.error
}
