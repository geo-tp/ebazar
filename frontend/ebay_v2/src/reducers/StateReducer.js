// State of object : New, Used...

import { GET_STATES, GET_STATES_ERROR, GET_STATES_SUCCESS } from "../constants/StateConstants";
import { initialState } from "./RootReducers";


export const StateReducer = (state=initialState.states, action) => {

    switch (action.type) {

        case GET_STATES:
            return {...state, loading:true}
        
        case GET_STATES_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_STATES_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.states}

        default:
            return state
    }

}