import { GET_SELECTIONS, GET_SELECTIONS_SUCCESS, GET_SELECTIONS_ERROR } from "../constants/SelectionConstants";
import { initState } from "./RootReducers";


export const SelectionReducer = (state=initState.selections, action) => {

    switch (action.type) {
        case GET_SELECTIONS:
            return {...state, loading:true}
    
        case GET_SELECTIONS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_SELECTIONS_SUCCESS:
            return {...state, loading:false, loaded: true, items:action.payload.selections}
        default:
            return state;
    }
} 