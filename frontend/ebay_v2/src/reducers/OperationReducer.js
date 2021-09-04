import { GET_OPERATIONS, GET_OPERATIONS_ERROR, GET_OPERATIONS_SUCCESS } from "../constants/OperationConstants"
import { initialState } from "./RootReducers";

export const OperationReducer = (state=initialState.operations, action) => {

    switch (action.type) {
        case GET_OPERATIONS:
            return {...state, loading:true}
        
        case GET_OPERATIONS_ERROR:
            return {...state, loading:false, error:action.payload.error}

        case GET_OPERATIONS_SUCCESS:
            return {...state, loading:false, loaded:true, items:action.payload.operations}
        
        default:
            return state
    }
}