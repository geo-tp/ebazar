import { createMessage, createMessageError, createMessageSuccess, getMessages, getMessagesError, getMessagesSuccess } from "../actions/MessageAction"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

// Used to mark message viewed = 1
export const fetchMessage = (messageId) => {

        let url = urlFormater({
            model: "message",
            pk: messageId
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
                return messages
            })

            .catch(error => {
                return error
            })
    }


export const fetchMessages = (userId, filter) => {
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
                dispatch(getMessagesSuccess(messages, filter))
            })

            .catch(error => {
                dispatch(getMessagesError(error))
            })
    }
}


export const fetchCreateMessage = (senderId, receiverId, title, text) => {
    return(dispatch) => {

        dispatch(createMessage())

        let url = urlFormater({
            model: "message",
        })

        let params = parametersFormater('POST', {sender:senderId, receiverId:receiverId,
                                                 title:title, text:text})

        fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(() => dispatch(createMessageSuccess()))

            .catch(error => {
                dispatch(createMessageError(error))
            })

    }
}