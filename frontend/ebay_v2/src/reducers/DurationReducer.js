import { GET_ACCOUNT_SUCCESS } from "../constants/AuthConstants";
import { GET_DURATIONS } from "../constants/DurationConstants";
import { initialState } from "./RootReducers";

export const DurationReducer = (state=initialState.durations, action) => {

    switch (action.type) {
        case GET_DURATIONS:
            return {...state, loading:true}

        case GET_DURATIONS_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_ACCOUNT_SUCCESS:
            return {...state, loading: false, loaded:true,
                    durations:action.payload.durations}
    
        default:
            break;
    }
}