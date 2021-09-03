import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"


export const fetchNextPage = (nextUrl, getFunc, errorFunc , successFunc ) => {
    return(dispatch) => {
        dispatch(getFunc())

        let params = parametersFormater("GET")

        return fetch(nextUrl, params)
            .then((rslt )=> {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then((objects) => {
                dispatch(successFunc(objects))
            })

            .catch((error) => {
                dispatch(errorFunc(error))
            })
    }
}
