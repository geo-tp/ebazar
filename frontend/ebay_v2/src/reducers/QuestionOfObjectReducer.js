import { GET_QUESTIONS_OF_OBJECT, GET_QUESTIONS_OF_OBJECT_ERROR, GET_QUESTIONS_OF_OBJECT_SUCCESS } from "../constants/QuestionOfObjectConstants";
import { initialState } from "./RootReducers";


export const QuestionOfObjectReducer = (state=initialState.questionsOfObject, action) => {

    switch (action.type) {

        case GET_QUESTIONS_OF_OBJECT:
            return {...state, loading: true}
        
        case GET_QUESTIONS_OF_OBJECT_ERROR:
            return {...state, loading: false, 
                    error:action.payload.error}

        case GET_QUESTIONS_OF_OBJECT_SUCCESS:
            return {...state, loading: false, loaded:true,
                     items:action.payload.questions}

        default:
            return state
    }
}