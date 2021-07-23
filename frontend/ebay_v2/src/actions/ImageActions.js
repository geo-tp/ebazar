import { CREATE_IMAGE_OF_OBJECT, CREATE_IMAGE_OF_OBJECT_ERROR, CREATE_IMAGE_OF_OBJECT_SUCCESS, 
         DELETE_IMAGE_OF_OBJECT, DELETE_IMAGE_OF_OBJECT_ERROR, DELETE_IMAGE_OF_OBJECT_SUCCESS, 
         EDIT_IMAGE_OF_OBJECT, EDIT_IMAGE_OF_OBJECT_ERROR, EDIT_IMAGE_OF_OBJECT_SUCCESS, 
         GET_IMAGES_OF_OBJECT, GET_IMAGES_OF_OBJECT_ERROR, GET_IMAGES_OF_OBJECT_SUCCESS } from "../constants/ImageConstants";

export const getImagesOfObject = (objectId) => ({
    type: GET_IMAGES_OF_OBJECT,
    payload: {objectId: objectId}
})

export const getImagesOfObjectError = (error) => ({
    type: GET_IMAGES_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const getImagesOfObjectSucces = (images) => ({
    type: GET_IMAGES_OF_OBJECT_SUCCESS,
    payload: {images: images}
})

export const editImageOfObject = (imageId, newImage) => ({
    type: EDIT_IMAGE_OF_OBJECT,
    payload: {imageId: imageId, newImage:newImage}
})

export const editImageOfObjectError = (error) => ({
    type: EDIT_IMAGE_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const editImageObjectSuccess = (image) => ({
    type:EDIT_IMAGE_OF_OBJECT_SUCCESS,
    payload: {image:image}
})

export const deleteImageOfObject = (imageId) => ({
    type: DELETE_IMAGE_OF_OBJECT,
    payload: {imageId:imageId}
})

export const deleteImageObjectError = (error) => ({
    type: DELETE_IMAGE_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const deleteImageObjectSuccess = () => ({
    type: DELETE_IMAGE_OF_OBJECT_SUCCESS,
    payload: {}
})

export const createImageOfObject = (image) => ({
    type: CREATE_IMAGE_OF_OBJECT,
    payload: {image:image}
})

export const createImageObjectError = (error) => ({
    type: CREATE_IMAGE_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const createImageObjectSuccess = (image) => ({
    type: CREATE_IMAGE_OF_OBJECT_SUCCESS,
    payload: {image:image}
})