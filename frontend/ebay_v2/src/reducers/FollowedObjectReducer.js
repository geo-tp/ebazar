import { GET_FOLLOWED_OBJECTS, GET_FOLLOWED_OBJECTS_ERROR, GET_FOLLOWED_OBJECTS_SUCCESS, 
         GET_NEXT_FOLLOWED_OBJECTS_PAGE, GET_NEXT_FOLLOWED_OBJECTS_PAGE_ERROR, GET_NEXT_FOLLOWED_OBJECTS_PAGE_SUCCESS } 
         from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";

export const FollowedObjectReducer = (state=initialState.userFollowedObjects, action) => {

    switch (action.type) {
        case GET_FOLLOWED_OBJECTS:
            return {...state, loading:true}
        
        case GET_FOLLOWED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_FOLLOWED_OBJECTS_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.objects}
    
        case GET_NEXT_FOLLOWED_OBJECTS_PAGE:

            return {...state, loading:true}

        case GET_NEXT_FOLLOWED_OBJECTS_PAGE_ERROR:
            return {...state, loading:false, loaded:false, error:action.payload.error}

        case GET_NEXT_FOLLOWED_OBJECTS_PAGE_SUCCESS:
            let results = [...state.items.results, ...action.payload.objects.results]
            return {...state, loading:false, 
                    items: {...action.payload.objects, 
                            results: results}
            }

        default:
            return state
    }

}