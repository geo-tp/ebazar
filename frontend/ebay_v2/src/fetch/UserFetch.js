import { API_USER } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchUserByUsername = (username) => {

    let url =  urlFormater({
        model: API_USER,
        filter_field: "username",
        filter_value: username
    })

    let params = parametersFormater("GET")

    return fetch(url, params)
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