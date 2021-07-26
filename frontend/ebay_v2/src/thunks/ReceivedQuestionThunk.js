import { getQuestionsOfUser, getQuestionsOfUserError, getQuestionsOfUserSuccess } from "../actions/ReceivedQuestionActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchQuestionsOfUser = (userId) => {
    return (dispatch) => {
        dispatch(getQuestionsOfUser(userId))

        let url = urlFormater({
            model: "question",
            filter_field: "user",
            filter_value: userId
        })

        let params = parametersFormater("GET")

        fetch(url, params)
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