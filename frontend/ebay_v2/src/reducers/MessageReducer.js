import { GET_SENDED_MESSAGES, GET_SENDED_MESSAGES_ERROR, GET_SENDED_MESSAGES_SUCCESS,
         GET_RECEIVED_MESSAGES, GET_RECEIVED_MESSAGES_ERROR, GET_RECEIVED_MESSAGES_SUCCESS } from "../constants/MessagesConstants";
import { initialState } from "./RootReducers";

export const SendedMessageReducer = (state=initialState.sendedMessages, action) => {

    switch (action.type) {
        case GET_SENDED_MESSAGES:
            return {...state, loading:true}
    
        case GET_SENDED_MESSAGES_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_SENDED_MESSAGES_SUCCESS:
            
            return {...state, loading:false, loaded:true,
                    items: action.payload.messages}
        default:
            return state
    }
}

export const ReceivedMessageReducer = (state=initialState.receivedMessages, action) => {

    switch (action.type) {
        case GET_RECEIVED_MESSAGES:
            return {...state, loading:true}
    
        case GET_RECEIVED_MESSAGES_ERROR:
            return {...state, loading:false, 
                    error:action.payload.error}

        case GET_RECEIVED_MESSAGES_SUCCESS:
            
            return {...state, loading:false, loaded:true,
                    items: action.payload.messages}
        default:
            return state
    }
}