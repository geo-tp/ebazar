import { NOT_FOUND } from "../utils/errors"
import { urlFormater } from "../utils/urlFormater"


export const fetchUserByUsername = (username) => {

    let url =  urlFormater({
        model: "user",
        filter_field: "username",
        filter_value: username
    })

    return fetch(url)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error(NOT_FOUND)
                    }

                    return rslt.json()
                })

                .then(user => {
                    return {user:user.results[0]}
                })

                .catch(error => {
                    return {error:error}
                })
}