import { EDIT_OBJECT, EDIT_OBJECT_ERROR, GET_OBJECTS, GET_OBJECTS_ERROR, GET_OBJECTS_SUCCESS } from "../constants/ObjectConstants";



export const getObjects = () => ({
    type: GET_OBJECTS,
    payload: {}
})

export const getObjectsSuccess = (objects) => ({
    type: GET_OBJECTS_SUCCESS,
    payload: {objects: objects}
})

export const getObjectsError = (error) => ({
    type: GET_OBJECTS_ERROR,
    payload: {error: error}
})

export const editObject = (editedObject) => ({
    type: EDIT_OBJECT,
    payload:{object: editedObject}
})

export const editObjectError = (error) => ({
    type: EDIT_OBJECT_ERROR,
    payload:{error: error}
})

export const editObjectSuccess = (newObject) => ({
    type: EDIT_OBJECT_ERROR,
    payload:{objects: newObject}
})