import { getQuestionsOfObject, getQuestionsOfObjectError, getQuestionsOfObjectSuccess,
         getNextQuestionsOfObjectPage, getNextQuestionsOfObjectPageError, getNextQuestionsOfObjectPageSuccess,
         getQuestionsOfUser, getQuestionsOfUserError, getQuestionsOfUserSuccess, createQuestionsOfObject, createQuestionsOfObjectError, createQuestionsOfObjectSuccess } from "../actions/QuestionActions.js"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import {NOT_FOUND} from "../utils/errors"
import { API_QUESTION_AND_ANSWER } from "../utils/apiEndPoints.js"


export const fetchQuestionsOfObject = (objectId) => {
    return(dispatch) => {

        dispatch(getQuestionsOfObject(objectId))
        
        let url = urlFormater({
            model: API_QUESTION_AND_ANSWER,
            filter_fields : ["obj", "answered"],
            filter_values: [objectId,true]
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if(!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(questionsOfObject => {
                dispatch(getQuestionsOfObjectSuccess(questionsOfObject))
            })

            .catch(error => {
                dispatch(getQuestionsOfObjectError(error))
            })
    }
}

export const fetchNextQuestionsOfObjectPage = (url) => {
    return (dispatch) => {

        dispatch(getNextQuestionsOfObjectPage())

        let params = parametersFormater("GET")

        return fetch(url, params)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then(questions => {
                        dispatch(getNextQuestionsOfObjectPageSuccess(questions))
                    })

                    .catch(error => {
                        dispatch(getNextQuestionsOfObjectPageError(error))
                    })
    }
}

export const fetchQuestionsOfUser = (userId) => {
    return (dispatch) => {

        dispatch(getQuestionsOfUser(userId))

        let url = urlFormater({
            model: "question",
            filter_field: "receiver",
            filter_value: userId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(questionsOfUser => {
                dispatch(getQuestionsOfUserSuccess(questionsOfUser))
            })

            .catch(error => {
                dispatch(getQuestionsOfUserError(error))
            })
    }
}


export const fetchCreateQuestion = (senderId, receiverId, text, obj) => {
    return(dispatch) => {

        dispatch(createQuestionsOfObject())

        let url = urlFormater({
            model: "question",
        })

        let params = parametersFormater('POST', {sender:senderId, receiver:receiverId,
                                                 text:text, obj:obj})

        fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(() => dispatch(createQuestionsOfObjectSuccess()))

            .catch(error => {
                dispatch(createQuestionsOfObjectError(error))
            })

    }
}
