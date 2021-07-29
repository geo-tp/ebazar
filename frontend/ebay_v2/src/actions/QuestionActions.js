import { GET_QUESTIONS_OF_OBJECT, GET_QUESTIONS_OF_OBJECT_ERROR, GET_QUESTIONS_OF_OBJECT_SUCCESS, 
         GET_QUESTIONS_OF_USER, GET_QUESTIONS_OF_USER_ERROR, GET_QUESTIONS_OF_USER_SUCCESS  } from "../constants/QuestionConstants"

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

export const getQuestionsOfUser = (userId) => ({
    type: GET_QUESTIONS_OF_USER,
    payload: {userId: userId}
})

export const getQuestionsOfUserError = (error) => ({
    type: GET_QUESTIONS_OF_USER_ERROR,
    payload: {error:error}
})

export const getQuestionsOfUserSuccess = (questions) => ({
    type: GET_QUESTIONS_OF_USER_SUCCESS,
    payload: {questions:questions}
})
