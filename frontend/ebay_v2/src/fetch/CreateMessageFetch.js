import { API_MESSAGE } from "../utils/apiEndPoints"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchCreateMessage = (sender, receiver, title, text) => {

    let url = urlFormater({
        model: API_MESSAGE
    })

    let params = parametersFormater("POST", {sender:sender, receiver:receiver, title:title, text:text})
    return fetch(url, params)
                .then(rslt => {
                    return rslt.json()
                })

                .then(response => {
                    return response 
                })

                .catch(error => {
                    return error
                })
}
