import { CREATE_ANSWER, CREATE_ANSWER_ERROR, CREATE_ANSWER_SUCCESS } from "../constants/AnswerConstants"

export const createAnswer = (questionId, answer) => ({
    type: CREATE_ANSWER,
    payload: {questionId: questionId, answer:answer}
})

export const createAnswerError = (error) => ({
    type: CREATE_ANSWER_ERROR,
    payload: {error:error}
})

export const createAnswerSuccess = () => ({
    type: CREATE_ANSWER_SUCCESS,
    payload: {}
})