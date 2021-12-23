import { API_QUESTION } from "../utils/apiEndPoints"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchCreateQuestion = (sender, receiver, text, obj) => {

    let url = urlFormater({
        model: API_QUESTION,
    })

    let params = parametersFormater('POST', {sender:sender, receiver:receiver,
                                                text:text, obj:obj})

    return fetch(url, params)
            .then(rslt => {
                return rslt.json()
            })

            .then(response => {return response})

            .catch(error => {return error})

}
