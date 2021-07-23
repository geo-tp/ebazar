import { GET_DURATIONS, GET_DURATIONS_ERROR, GET_DURATIONS_SUCCESS } from "../constants/DurationConstants";

export const getDurations = () => ({
    type: GET_DURATIONS,
    payload: {}
})

export const getDurationsSuccess = (durations) => ({
    type: GET_DURATIONS_SUCCESS,
    payload: {durations:durations}
})

export const getDurationsError = (error) => ({
    type: GET_DURATIONS_ERROR,
    payload: {error:error}
})