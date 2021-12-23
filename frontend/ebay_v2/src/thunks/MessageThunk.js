import { createMessage, createMessageError, createMessageSuccess, 
         getSendedMessages, getSendedMessagesError, getSendedMessagesSuccess,
         getReceivedMessages, getReceivedMessagesError, getReceivedMessagesSuccess } from "../actions/MessageAction"
import { API_MESSAGE } from "../utils/apiEndPoints"

import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

// Used to mark message viewed = 1
export const fetchMessage = (messageId) => {

        let url = urlFormater({
            model: API_MESSAGE,
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


export const fetchSendedMessages = (userId) => {
    return (dispatch) => {

        dispatch(getSendedMessages(userId))

        let url = urlFormater({
            model: "message",
            filter_field: 'sender',
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
                dispatch(getSendedMessagesSuccess(messages))
            })

            .catch(error => {
                dispatch(getSendedMessagesError(error))
            })
    }
}

export const fetchReceivedMessages = (userId) => {
    return (dispatch) => {

        dispatch(getReceivedMessages(userId))

        let url = urlFormater({
            model: "message",
            filter_field: "receiver",
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
                dispatch(getReceivedMessagesSuccess(messages))
            })

            .catch(error => {
                dispatch(getReceivedMessagesError(error))
            })
    }
}




// export const fetchCreateMessage = (senderId, receiverId, title, text) => {
//     return(dispatch) => {

//         dispatch(createMessage())

//         let url = urlFormater({
//             model: "message",
//         })

//         let params = parametersFormater('POST', {sender:senderId, receiverId:receiverId,
//                                                  title:title, text:text})

//         fetch(url, params)
//             .then(rslt => {
//                 if (!rslt.ok) {
//                     throw new Error(NOT_FOUND)
//                 }

//                 return rslt.json()
//             })

//             .then(() => dispatch(createMessageSuccess()))

//             .catch(error => {
//                 dispatch(createMessageError(error))
//             })

//     }
// }