import { EDIT_OBJECT, EDIT_OBJECT_ERROR, EDIT_OBJECT_SUCCESS, GET_OBJECTS, GET_OBJECTS_ERROR, GET_OBJECTS_SUCCESS } from "../constants/ObjectConstants";
import {initialState} from '../reducers/RootReducers'


export const ObjectReducer = (state=initialState.objects, action) => {

    
    switch (action.type) {
        
        case GET_OBJECTS:

            return {...state, loading:true}
            

        case GET_OBJECTS_ERROR:

            return {...state, ...{loading: false, error: action.payload.error}}


        case GET_OBJECTS_SUCCESS:

            return {...state, loading:false, loaded: true,
                       items: action.payload.objects}         
            
        case EDIT_OBJECT:
            return {...state, loading:true}

        case EDIT_OBJECT_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case EDIT_OBJECT_SUCCESS:
            return {...state,
                    items: state.objects.map((object) => {
                                    return object.id == action.payload.id ? 
                                                action.payload             : 
                                                object
                                }),
                    loading: false
            }
     
        default:
            return state
    }
}