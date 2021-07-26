import { createAnswer } from "../actions/AnswerActions"
import { createOperationError } from "../actions/OperationActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchCreateAnswer = (questionId, answer) => {
    return (dispatch) => {

        dispatch(createAnswer(questionId, answer))

        let url = urlFormater({
            model: "answer"
        })

        let params = parametersFormater(
                "POST", 
                {question:questionId, answerText:answer}
        )

        return fetch(url, params)
            .then(rslt => {

                if(rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })
            
            .then(() => {
                dispatch(createAnswerSuccess())
            })

            .catch(error => {
                dispatch(createOperationError(error))
            })
    }
}

