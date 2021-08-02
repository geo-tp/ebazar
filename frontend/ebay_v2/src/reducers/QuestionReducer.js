import { GET_QUESTIONS_OF_OBJECT, GET_QUESTIONS_OF_OBJECT_ERROR, GET_QUESTIONS_OF_OBJECT_SUCCESS, 
         GET_QUESTIONS_OF_USER, GET_QUESTIONS_OF_USER_ERROR, GET_QUESTIONS_OF_USER_SUCCESS } from "../constants/QuestionConstants";
         
import { initialState } from "./RootReducers";


export const QuestionReducer = (state=initialState.questions, action) => {

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

export const QuestionOfObjectReducer = (state=initialState.detailledObjectQuestions, action) => {

    switch (action.type) {
        
        case GET_QUESTIONS_OF_OBJECT:
            return {...state, loading: true}
        
        case GET_QUESTIONS_OF_OBJECT_ERROR:
            return {...state, loading: false, 
                    error:action.payload.error}

        case GET_QUESTIONS_OF_OBJECT_SUCCESS:
            return {...state, loading: false, loaded:true,
                     items:action.payload.questions}

    }
}