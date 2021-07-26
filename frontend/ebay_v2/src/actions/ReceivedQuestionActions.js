import { GET_QUESTIONS_OF_USER, GET_QUESTIONS_OF_USER_ERROR, GET_QUESTIONS_OF_USER_SUCCESS } from "../constants/ReceivedQuestionConstant"


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