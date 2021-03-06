import { GET_ACTIVE_OBJECTS, GET_ACTIVE_OBJECTS_ERROR, GET_ACTIVE_OBJECTS_SUCCESS } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const ActiveObjectReducer = (state=initialState.userActiveObjects, action) => {

    switch (action.type) {
        case GET_ACTIVE_OBJECTS:
            return {...state, loading:true}
        
        case GET_ACTIVE_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_ACTIVE_OBJECTS_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}