import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { getCategories, getCategoriesError, getCategoriesSuccess} from "../actions/CategoryActions"
import { NOT_FOUND } from "../utils/errors"


export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(getCategories())

        let url = urlFormater({
            model: "category"
        })

        let params = parametersFormater("GET") 

        return fetch(url, params)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then((categories) => {
                        dispatch(getCategoriesSuccess(categories))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getCategoriesError(error))
                    })
    }
}