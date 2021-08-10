import { GET_ENDED_OBJECTS, GET_ENDED_OBJECTS_ERROR, GET_ENDED_OBJECTS_SUCCES } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const EndedObjectReducer = (state=initialState.userEndedObjects, action) => {

    switch (action.type) {
        case GET_ENDED_OBJECTS:
            return {...state, loading:true}
        
        case GET_ENDED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_ENDED_OBJECTS_SUCCES:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}