import { GET_BIDDED_OBJECTS, GET_BIDDED_OBJECTS_ERROR, GET_BIDDED_OBJECTS_SUCCESS, 
         GET_NEXT_BIDDED_OBJECTS_PAGE, GET_NEXT_BIDDED_OBJECTS_PAGE_ERROR, GET_NEXT_BIDDED_OBJECTS_PAGE_SUCCESS } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const BiddedObjectReducer = (state=initialState.userBiddedObjects, action) => {

    switch (action.type) {
        case GET_BIDDED_OBJECTS:
            return {...state, loading:true}
        
        case GET_BIDDED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_BIDDED_OBJECTS_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        case GET_NEXT_BIDDED_OBJECTS_PAGE:
            return {...state, loading:true}

        case GET_NEXT_BIDDED_OBJECTS_PAGE_ERROR:
            console.log("ERROR", action.payload.error)
            return {...state, loading:false, loaded:false, error:action.payload.error}

        case GET_NEXT_BIDDED_OBJECTS_PAGE_SUCCESS:
            let results = [...state.items.results, ...action.payload.objects.results]
            return {...state, loading:false, 
                    items: {...action.payload.objects, 
                            results: results}
            }
        default:
            return state
    }
}