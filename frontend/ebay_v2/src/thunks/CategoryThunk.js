import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"
import { getCategories, getCategoriesError, getCategoriesSuccess} from "../actions/CategoryActions"

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
                            throw new Error("Error - 404 Not Found")
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