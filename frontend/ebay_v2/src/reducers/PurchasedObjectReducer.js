import { GET_PURCHASED_OBJECTS, GET_PURCHASED_OBJECTS_ERROR, GET_PURCHASED_OBJECTS_SUCCESS } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const PurchasedObjectReducer = (state=initialState.userPurchasedObjects, action) => {

    switch (action.type) {
        case GET_PURCHASED_OBJECTS:
            return {...state, loading:true}
        
        case GET_PURCHASED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_PURCHASED_OBJECTS_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}