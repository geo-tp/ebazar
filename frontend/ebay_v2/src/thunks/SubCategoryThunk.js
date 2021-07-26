import { getSubCategories, getSubCategoriesError, getSubCategoriesSuccess } from "../actions/SubCategoryActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchSubCategories = (categoryId) => {
    return (dispatch) => {
        dispatch(getSubCategories(categoryId))

        let url = urlFormater({
            model: "subcategory",
            filter_field: "category",
            filter_value: categoryId
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
                        dispatch(getSubCategoriesSuccess(categories))
                    })

                    .catch((error) => {
                        console.log(error)
                        dispatch(getSubCategoriesError(error))
                    })
    }
}