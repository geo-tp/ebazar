import { GET_STATES_ERROR, GET_STATES_SUCCESS, GET_STATES } from "../constants/StateConstants"

export const getStates = () => ({
    type: GET_STATES,
    payload: {}
})

export const getStatesError = (error) => ({
    type: GET_STATES_ERROR,
    payload: {error:error}
})

export const getStatesSuccess = (states) => ({
    type: GET_STATES_SUCCESS,
    patload: {states:states}
})

