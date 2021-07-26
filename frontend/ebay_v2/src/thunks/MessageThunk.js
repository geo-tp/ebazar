import { getMessages, getMessagesError, getMessagesSuccess } from "../actions/MessageAction"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchMessages = (userId, filter="receiver") => {
    return (dispatch) => {

        dispatch(getMessages(userId))

        let url = urlFormater({
            model: "message",
            filter_field: filter,
            filter_value: userId
        })

        let params = parametersFormater('GET')

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })


            .then(messages => {
                dispatch(getMessagesSuccess(messages))
            })

            .catch(error => {
                dispatch(getMessagesError(error))
            })
    }
}