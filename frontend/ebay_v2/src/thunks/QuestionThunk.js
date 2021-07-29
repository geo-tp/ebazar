import { getQuestionsOfObject, getQuestionsOfObjectError, getQuestionsOfObjectSuccess,
         getQuestionsOfUser, getQuestionsOfUserError, getQuestionsOfUserSuccess } from "../actions/QuestionActions.js"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import {NOT_FOUND} from "../utils/errors"


export const fetchQuestionsOfObject = (objectId) => {
    return(dispatch) => {

        dispatch(getQuestionsOfObject(objectId))
        
        let url = urlFormater({
            model: "question",
            filter_field : "obj",
            filter_value: objectId
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