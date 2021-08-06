import { GET_FOLLOWED_OBJECTS, GET_FOLLOWED_OBJECTS_ERROR, GET_FOLLOWED_OBJECTS_SUCCES } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const FollowedObectReducer = (state=initialState.userFollowedObjects, action) => {

    switch (action.type) {
        case GET_FOLLOWED_OBJECTS:
            return {...state, loading:true}
        
        case GET_FOLLOWED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_FOLLOWED_OBJECTS_SUCCES:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}