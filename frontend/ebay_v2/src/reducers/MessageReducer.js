import { GET_MESSAGES, GET_MESSAGES_ERROR, GET_MESSAGES_SUCCESS } from "../constants/MessagesConstants";
import { initialState } from "./RootReducers";

export const MessageReducer = (state=initialState.messages, action) => {

    switch (action.type) {
        case GET_MESSAGES:
            return {...state, loading:true}
    
        case GET_MESSAGES_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_MESSAGES_SUCCESS:
            return {...state, loading:false, 
                    messages:action.payload.messages}
        default:
            return state
    }
}