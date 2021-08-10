import { GET_SELLED_OBJECTS, GET_SELLED_OBJECTS_ERROR, GET_SELLED_OBJECTS_SUCCES } from "../constants/ObjectConstants";
import { initialState } from "./RootReducers";


export const SelledObjectReducer = (state=initialState.userSelledObjects, action) => {

    switch (action.type) {
        case GET_SELLED_OBJECTS:
            return {...state, loading:true}
        
        case GET_SELLED_OBJECTS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_SELLED_OBJECTS_SUCCES:
            return {...state, loading:false, loaded:true, items:action.payload.objects}

        default:
            return state
    }
}