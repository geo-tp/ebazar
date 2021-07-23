import { DELETE_QUESTION_OF_OBJECT, DELETE_QUESTION_OF_OBJECT_ERROR, DELETE_QUESTION_OF_OBJECT_SUCCESS,
         GET_QUESTIONS_OF_OBJECT, GET_QUESTIONS_OF_OBJECT_ERROR, GET_QUESTIONS_OF_OBJECT_SUCCESS } from "../constants/QuestionConstants"


export const getQuestionsOfObject = (objectId) => ({
    type: GET_QUESTIONS_OF_OBJECT,
    payload: {objectId: objectId}
})

export const getQuestionsOfObjectError = (error) => ({
    type: GET_QUESTIONS_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const getQuestionsOfObjectSuccess = (questions) => ({
    type: GET_QUESTIONS_OF_OBJECT_SUCCESS,
    payload: {questions:questions}
})

export const deleteQuestionsOfObject = (questionId) => ({
    type: DELETE_QUESTION_OF_OBJECT,
    payload: {questionId:questionId}
})

export const deleteQuestionsOfObjectError = (error) => ({
    type: DELETE_QUESTION_OF_OBJECT_ERROR,
    payload: {error:error}
})

export const deleteQuestionsOfObjectSuccess = (questions) => ({
    type: DELETE_QUESTION_OF_OBJECT_SUCCESS, 
    payload: {}
})