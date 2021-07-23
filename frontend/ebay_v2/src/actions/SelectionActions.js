import { GET_SELECTIONS, GET_SELECTIONS_ERROR, GET_SELECTIONS_SUCCESS } from "../constants/SelectionConstants";

export const getSelections = () => ({
    type: GET_SELECTIONS,
    payload: {}
})

export const getSelectionsError = (error) => ({
    type: GET_SELECTIONS_ERROR,
    payload: {error:error}
})

export const getSelectionsSuccess = (selections) => ({
    type: GET_SELECTIONS_SUCCESS,
    payload: {selections:selections}
})

