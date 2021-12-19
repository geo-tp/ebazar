import { ACCEPT_COOKIE, CREATE_ACCOUNT, CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_SUCCESS, 
         DELETE_ACCOUNT, DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_SUCCESS, 
         GET_CONNECTED, GET_CONNECTED_ERROR, GET_CONNECTED_SUCCESS, 
         GET_DISCONNECTED, GET_DISCONNECTED_ERROR, GET_DISCONNECTED_SUCCESS } from "../constants/AuthConstants";

export const getConnected = (mail, password) => ({
    type: GET_CONNECTED,
    payload: {mail:mail, password:password}
})

export const getConnectedError = (error) => ({
    type: GET_CONNECTED_ERROR,
    payload: {error:error}
})

export const getConnectedSuccess = (userAndToken) => ({
    type: GET_CONNECTED_SUCCESS,
    payload: {token: userAndToken["key"], user: userAndToken["user"]}
})

export const getDisconnected = () => ({
    type: GET_DISCONNECTED,
    payload: {}
})

export const getDisconnectedError = (error) => ({
    type: GET_DISCONNECTED_ERROR,
    payload: {error:error}
})

export const getDisconnectedSuccess = () => ({
    type: GET_DISCONNECTED_SUCCESS,
    payload: {}
})

export const createAccount = (registrationInfos) => ({
    type: CREATE_ACCOUNT,
    payload: {registrationInfos:registrationInfos}
})

export const createAccountError = (error) => ({
    type: CREATE_ACCOUNT_ERROR,
    payload:{error:error}
})

export const createAccountSuccess = () => ({
    type: CREATE_ACCOUNT_SUCCESS,
    payload:{}
})

export const deleteAccount = (userId) => ({
    type: DELETE_ACCOUNT,
    payload: {userId: userId}
})

export const deleteAccountError = (error) => ({
    type: DELETE_ACCOUNT_ERROR, 
    payload: {error:error}
})

export const deleteAccountSuccess = () => ({
    type: DELETE_ACCOUNT_SUCCESS,
    payload:{}
})

export const acceptCookie = () => ({
    type: ACCEPT_COOKIE,
    payload:{}
})