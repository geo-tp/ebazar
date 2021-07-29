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
            
            let messages = action.payload.messages
            let temp = {}
            if (action.payload.type=="receiver") {
                temp["receivedMessages"] = messages
            }

            else {
                temp["sendedMessages"] = messages
            }

            return {...state, loading:false, loaded:true,
                    ...temp}
        default:
            return state
    }
}