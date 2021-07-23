import { CREATE_ANSWER, CREATE_ANSWER_ERROR, CREATE_ANSWER_SUCCESS } from "../constants/AnswerConstants"

export const createAnswer = (questionId) => ({
    type: CREATE_ANSWER,
    payload: {questionId: questionId}
})

export const createAnswerError = (error) => ({
    type: CREATE_ANSWER_ERROR,
    payload: {error:error}
})

export const createAnswerSuccess = (answer) => ({
    type: CREATE_ANSWER_SUCCESS,
    payload: {answer:answer}
})