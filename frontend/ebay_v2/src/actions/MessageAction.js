import { CREATE_MESSAGE, CREATE_MESSAGE_ERROR, CREATE_MESSAGE_SUCCESS,
         DELETE_MESSAGE, DELETE_MESSAGE_ERROR, DELETE_MESSAGE_SUCCESS, 
         EDIT_MESSAGE, EDIT_MESSAGE_ERROR, EDIT_MESSAGE_SUCCESS, 
         GET_SENDED_MESSAGES, GET_SENDED_MESSAGES_ERROR, GET_SENDED_MESSAGES_SUCCESS,
         GET_RECEIVED_MESSAGES, GET_RECEIVED_MESSAGES_ERROR, GET_RECEIVED_MESSAGES_SUCCESS,
         GET_MESSAGE, GET_MESSAGE_ERROR, GET_MESSAGE_SUCCESS } from "../constants/MessagesConstants";

export const getMessage = (messageId) => ({
    type: GET_MESSAGE,
    payload: {messageId: messageId}
})

export const getMessageError = (error) => ({
    type:GET_MESSAGE_ERROR,
    payload: {error:error}
})

export const getMessageSuccess = (message) => ({
    type: GET_MESSAGE_SUCCESS,
    payload: {message:message}
})

export const getSendedMessages = (userId) => ({
    type: GET_SENDED_MESSAGES,
    payload: {userId: userId}
})

export const getSendedMessagesError = (error) => ({
    type:GET_SENDED_MESSAGES_ERROR,
    payload: {error:error}
})

export const getSendedMessagesSuccess = (messages) => ({
    type: GET_SENDED_MESSAGES_SUCCESS,
    payload: {messages:messages}
})

export const getReceivedMessages = (userId) => ({
    type: GET_RECEIVED_MESSAGES,
    payload: {userId: userId}
})

export const getReceivedMessagesError = (error) => ({
    type:GET_RECEIVED_MESSAGES_ERROR,
    payload: {error:error}
})

export const getReceivedMessagesSuccess = (messages) => ({
    type: GET_RECEIVED_MESSAGES_SUCCESS,
    payload: {messages:messages}
})


export const createMessage = () => ({
    type: CREATE_MESSAGE,
    payload: {}
})

export const createMessageError = (error) => ({
    type: CREATE_MESSAGE_ERROR,
    payload: {error:error}
})

export const createMessageSuccess = () => ({
    type: CREATE_MESSAGE_SUCCESS,
    payload: {}
})

export const editMessage = (messageId, newMessage) => ({
    type: EDIT_MESSAGE,
    payload: {messageId:messageId, newMessage: newMessage}
})

export const editMessageError = (error) => ({
    type: EDIT_MESSAGE_ERROR,
    payload: {error:error}
})

export const editMessageSuccess = (message) => ({
    type: EDIT_MESSAGE_SUCCESS,
    payload: {message:message}
})

export const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
    payload: {message:message}
})

export const deleteMessageError = (error) => ({
    type: DELETE_MESSAGE_ERROR,
    payload: {error:error}
})

export const deleteMessageSuccess = () => ({
    type:DELETE_MESSAGE_SUCCESS,
    payload: {}
})

