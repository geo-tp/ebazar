import { GET_BIDDED_OBJECTS, GET_BIDDED_OBJECTS_ERROR, GET_BIDDED_OBJECTS_SUCCES } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const BiddedObectReducer = (state=initialState.userBiddedObjects, action) => {

    switch (action.type) {
        case GET_BIDDED_OBJECTS:
            return {...state, loading:true}
        
        case GET_BIDDED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_BIDDED_OBJECTS_SUCCES:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}