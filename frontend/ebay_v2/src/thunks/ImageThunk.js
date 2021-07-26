import { getImagesOfObject, getImagesOfObjectError, getImagesOfObjectSucces } from "../actions/ImageActions"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"


export const fetchImages = (objectId) => {
    return (dispatch) => {

        dispatch(getImagesOfObject(objectId))

        let url = urlFormater({
            model: "image",
            filter_field: "obj",
            filter_value: objectId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then(images => {
                        dispatch(getImagesOfObjectSucces(images))
                    })

                    .catch(error => {
                        dispatch(getImagesOfObjectError(error))
                    })
    }
}