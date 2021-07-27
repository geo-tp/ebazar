import { EDIT_USER, EDIT_USER_ERROR, EDIT_USER_SUCCESS, 
         GET_DETAILLED_USER, GET_DETAILLED_USER_ERROR, GET_DETAILLED_USER_SUCCESS,
         GET_USER, GET_USER_ERROR, GET_USER_SUCCESS } from "../constants/UserConstants";


export const getUser = (userId) => ({
    type: GET_USER,
    payload:{userId:userId}
})

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload:{error:error}
})

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: {user:user}
})

export const getDetailledUser = (userId) => ({
    type: GET_DETAILLED_USER,
    payload: {userId:userId}
})

export const getDetailledUserError = (error) => ({
    type: GET_DETAILLED_USER_ERROR,
    payload: {error:error}
})

export const getDetailledUserSuccess = (user) => ({
    type: GET_DETAILLED_USER_SUCCESS,
    payload: {user:user}
})

export const editUser = (userId, modification) => ({
    type: EDIT_USER,
    payload:{userId:userId, modification:modification}
})

export const editUserError = (error) => ({
    type: EDIT_USER_ERROR,
    payload: {error:error}
})

export const editUserSuccess = (user) => ({
    type : EDIT_USER_SUCCESS,
    payload: {user:user}
})
