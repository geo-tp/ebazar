import { GET_USER_BALANCE, GET_USER_BALANCE_ERROR, GET_USER_BALANCE_SUCCESS } from "../constants/BalanceConstants"

export const getUserBalance = () => ({
    type: GET_USER_BALANCE,
    payload: {}
})

export const getUserBalanceError = (error) => ({
    type: GET_USER_BALANCE_ERROR,
    payload: {error:error}
})

export const getUserBalanceSuccess = (balance) => ({
    type: GET_USER_BALANCE_SUCCESS,
    payload: {balance:balance}
})