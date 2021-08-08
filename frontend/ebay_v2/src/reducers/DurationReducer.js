import { GET_DURATIONS, GET_DURATIONS_ERROR, GET_DURATIONS_SUCCESS } from "../constants/DurationConstants";
import { initialState } from "./RootReducers";

export const DurationReducer = (state=initialState.durations, action) => {

    switch (action.type) {
        case GET_DURATIONS:
            return {...state, loading:true}

        case GET_DURATIONS_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_DURATIONS_SUCCESS:
            return {...state, loading: false, loaded:true,
                    items:action.payload.durations}
    
        default:
            return state;
    }
}