import { EDIT_OBJECT, EDIT_OBJECT_ERROR, EDIT_OBJECT_SUCCESS, 
         GET_NEXT_OBJECTS_PAGE, GET_NEXT_OBJECTS_PAGE_ERROR, GET_NEXT_OBJECTS_PAGE_SUCCESS,
         GET_OBJECT, GET_OBJECT_ERROR, GET_OBJECT_SUCCESS,
         GET_OBJECTS, GET_OBJECTS_ERROR, GET_OBJECTS_SUCCESS } from "../constants/ObjectConstants";
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


        case GET_NEXT_OBJECTS_PAGE:

            return {...state, loading:true}

        case GET_NEXT_OBJECTS_PAGE_ERROR:
            console.log("ERROR", action.payload.error)
            return {...state, loading:false, loaded:false, error:action.payload.error}

        case GET_NEXT_OBJECTS_PAGE_SUCCESS:
            let results = [...state.items.results, ...action.payload.objects.results]
            return {...state, loading:false, 
                    items: {...action.payload.objects, 
                            results: results}
            }
            
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

// export const DetailledObjectReducer = (state=initialState.detailledObject, action) => {

//     switch (action.type) {
//         case GET_OBJECT:
//             return {...state, loading:true}

//         case GET_OBJECT_ERROR:
//             return {...state, loading:false, error:action.payload.error}

//         case GET_OBJECT_SUCCESS:
//             return {...state, loading:false, loaded:true, item:action.payload.object}
    
//         default:
//             return state
//     }
// }