import { GET_QUESTIONS_OF_USER, GET_QUESTIONS_OF_USER_ERROR, GET_QUESTIONS_OF_USER_SUCCESS } from "../constants/ReceivedQuestionConstant"
import { initialState } from "./RootReducers"

export const ReceivedQuestionReducer = (state=initialState.questions, action) => {

    switch (action.type) {

        case GET_QUESTIONS_OF_USER:
            return {...state, loading: true}
        
        case GET_QUESTIONS_OF_USER_ERROR:
            return {...state, loading: false, 
                    error:action.payload.error}

        case GET_QUESTIONS_OF_USER_SUCCESS:
            return {...state, loading: false, loaded:true,
                     items:action.payload.questions}

        default:
            return state
    }
}