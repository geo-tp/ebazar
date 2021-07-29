import { CREATE_MESSAGE, CREATE_MESSAGE_ERROR, CREATE_MESSAGE_SUCCESS,
         DELETE_MESSAGE, DELETE_MESSAGE_ERROR, DELETE_MESSAGE_SUCCESS, 
         EDIT_MESSAGE, EDIT_MESSAGE_ERROR, EDIT_MESSAGE_SUCCESS, 
         GET_MESSAGE, GET_MESSAGE_ERROR, GET_MESSAGE_SUCCESS,
         GET_MESSAGES, GET_MESSAGES_ERROR, GET_MESSAGES_SUCCESS } from "../constants/MessagesConstants";

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

export const getMessages = (userId) => ({
    type: GET_MESSAGES,
    payload: {userId: userId}
})

export const getMessagesError = (error) => ({
    type:GET_MESSAGES_ERROR,
    payload: {error:error}
})

export const getMessagesSuccess = (messages, type) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: {messages:messages, type:type}
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

