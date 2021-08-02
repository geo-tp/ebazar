import { CREATE_IMAGE_OF_OBJECT, CREATE_IMAGE_OF_OBJECT_ERROR, CREATE_IMAGE_OF_OBJECT_SUCCESS, 
         DELETE_IMAGE_OF_OBJECT, DELETE_IMAGE_OF_OBJECT_ERROR, DELETE_IMAGE_OF_OBJECT_SUCCESS, 
         EDIT_IMAGE_OF_OBJECT, EDIT_IMAGE_OF_OBJECT_ERROR, EDIT_IMAGE_OF_OBJECT_SUCCESS,
         GET_IMAGES_OF_OBJECT, GET_IMAGES_OF_OBJECT_ERROR, GET_IMAGES_OF_OBJECT_SUCCESS } from "../constants/ImageConstants";
import { initialState } from "./RootReducers";

export const ImageReducer = (state=initialState.imagesOfObject, action) => {

    switch (action.type) {
        case GET_IMAGES_OF_OBJECT:
            return {...state, loading:true}

        case GET_IMAGES_OF_OBJECT_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_IMAGES_OF_OBJECT_SUCCESS:
            return {...state, loading:false, loaded:true, 
                    items:action.payload.images}

        case CREATE_IMAGE_OF_OBJECT:
            return {...state, loading:true}

        case CREATE_IMAGE_OF_OBJECT_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}
        
        case CREATE_IMAGE_OF_OBJECT_SUCCESS:
            let image = action.payload.image
            let items = {...state.items, image}

            return {...state, loading:false, items:items}

        case EDIT_IMAGE_OF_OBJECT:
            return {...state, loading:true}

        case EDIT_IMAGE_OF_OBJECT_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case EDIT_IMAGE_OF_OBJECT_SUCCESS:

            return {...state, loading:false, items: state.items.map((item) => {
                
                            if (item.id == action.payload.image.id) {
                                return image
                            }

                            else {
                                return item
                            }
                })

            }

        case DELETE_IMAGE_OF_OBJECT:
            return {...state, loading:true}

        case DELETE_IMAGE_OF_OBJECT_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case DELETE_IMAGE_OF_OBJECT_SUCCESS:
            return {...state, items: 
                    state.items.map((item) => {
                        if (!item.id == action.payload.imageId) {
                            return item
                        }
                    })
            }
            


        default:
            return state
    }
}