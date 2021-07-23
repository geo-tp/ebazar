import { GET_DETAILLED_OBJECT, GET_DETAILLED_OBJECT_ERROR, GET_DETAILLED_OBJECT_SUCCESS } from "../constants/DetailledObjectViewConstants";

export const getDetailledObject = (objectId) => ({
    type: GET_DETAILLED_OBJECT,
    payload: {objectId: objectId}
})

export const getDetailledObjectError = (error) => ({
    type: GET_DETAILLED_OBJECT_ERROR,
    payload: {error:error}
}) 

export const getDetailledObjectSuccess = (object) => ({
    type: GET_DETAILLED_OBJECT_SUCCESS,
    payload: {object:object}
})