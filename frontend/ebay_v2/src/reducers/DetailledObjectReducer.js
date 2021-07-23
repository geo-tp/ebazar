import { GET_DETAILLED_OBJECT, GET_DETAILLED_OBJECT_ERROR, GET_DETAILLED_OBJECT_SUCCESS } from "../constants/DetailledObjectViewConstants";
import { initialState } from "./RootReducers";

export const detailledObjectReducer = (state=initialState.detailledObject, action) => {

    switch (action.type) {
        case GET_DETAILLED_OBJECT:
            return {...state, loading: true}
        
        case GET_DETAILLED_OBJECT_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_DETAILLED_OBJECT_SUCCESS:
            return {...state, loading:false, loaded: true, item:action.payload.object}

        default:
            return state
    }
}