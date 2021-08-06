import { CREATE_OBJECT, EDIT_OBJECT, EDIT_OBJECT_ERROR, EDIT_OBJECT_SUCCESS, 
         GET_NEXT_OBJECTS_PAGE, GET_NEXT_OBJECTS_PAGE_ERROR, GET_NEXT_OBJECTS_PAGE_SUCCESS, 
         GET_OBJECTS, GET_OBJECTS_ERROR, GET_OBJECTS_SUCCESS,
         GET_OBJECT, GET_OBJECT_ERROR, GET_OBJECT_SUCCESS,
         GET_BIDDED_OBJECTS, GET_BIDDED_OBJECTS_ERROR, GET_BIDDED_OBJECTS_SUCCES, 
         GET_ACTIVE_OBJECTS, GET_ACTIVE_OBJECTS_ERROR, GET_ACTIVE_OBJECTS_SUCCES, 
         GET_ENDED_OBJECTS, GET_ENDED_OBJECTS_ERROR, GET_ENDED_OBJECTS_SUCCES, 
         GET_FOLLOWED_OBJECTS, GET_FOLLOWED_OBJECTS_ERROR, GET_FOLLOWED_OBJECTS_SUCCES, 
         GET_SELLED_OBJECTS, GET_SELLED_OBJECTS_ERROR, GET_SELLED_OBJECTS_SUCCES, 
         GET_PURCHASED_OBJECTS, GET_PURCHASED_OBJECTS_ERROR, GET_PURCHASED_OBJECTS_SUCCES } from "../constants/ObjectConstants";


export const createObjects = () => ({
    type: CREATE_OBJECT,
    payload: {}
})


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
    type: EDIT_OBJECT_SUCCESS,
    payload:{objects: newObject}
})

export const getNextObjectPage = () => ({
    type: GET_NEXT_OBJECTS_PAGE,
    payload: {}
})

export const getNextObjectPageError = (error) => ({
    type: GET_NEXT_OBJECTS_PAGE_ERROR,
    payload: {error:error}
})

export const getNextObjectPageSuccess = (newObjects) => ({
    type: GET_NEXT_OBJECTS_PAGE_SUCCESS,
    payload: {objects:newObjects}
})

export const getBiddedObjects = () => ({
    type: GET_BIDDED_OBJECTS,
    payload: {}
})

export const getBiddedObjectsError = (error) => ({
    type: GET_BIDDED_OBJECTS_ERROR,
    payload: {error:error}
})

export const getBiddedObjectsSuccess = (objects) => ({
    type: GET_BIDDED_OBJECTS_SUCCES,
    payload: {objects:objects}
})

export const getSelledObjects = () => ({
    type: GET_SELLED_OBJECTS,
    payload: {}
})

export const getSelledObjectsError = (error) => ({
    type: GET_SELLED_OBJECTS_ERROR,
    payload: {error:error}
})

export const getSelledObjectsSuccess = (objects) => ({
    type: GET_SELLED_OBJECTS_SUCCES,
    payload: {objects:objects}
})

export const getPurchasedObjects = () => ({
    type: GET_PURCHASED_OBJECTS,
    payload: {}
})

export const getPurchasedObjectsError = (error) => ({
    type: GET_PURCHASED_OBJECTS_ERROR,
    payload: {error:error}
})

export const getPurchasedObjectsSuccess = (objects) => ({
    type: GET_PURCHASED_OBJECTS_SUCCES,
    payload: {objects:objects}
})

export const getEndedObjects = () => ({
    type: GET_ENDED_OBJECTS,
    payload: {}
})

export const getEndedObjectsError = (error) => ({
    type: GET_ENDED_OBJECTS_ERROR,
    payload: {error:error}
})

export const getEndedObjectsSuccess = (objects) => ({
    type: GET_ENDED_OBJECTS_SUCCES,
    payload: {objects:objects}
})

export const getActiveObjects = () => ({
    type: GET_ACTIVE_OBJECTS,
    payload: {}
})

export const getActiveObjectsError = (error) => ({
    type: GET_ACTIVE_OBJECTS_ERROR,
    payload: {error:error}
})

export const getActiveObjectsSuccess = (objects) => ({
    type: GET_ACTIVE_OBJECTS_SUCCES,
    payload: {objects:objects}
})


export const getFollowedObjects = () => ({
    type: GET_FOLLOWED_OBJECTS,
    payload: {}
})

export const getFollowedObjectsError = (error) => ({
    type: GET_FOLLOWED_OBJECTS_ERROR,
    payload: {error:error}
})

export const getFollowedObjectsSuccess = (objects) => ({
    type: GET_FOLLOWED_OBJECTS_SUCCES,
    payload: {objects:objects}
})




