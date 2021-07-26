import { getDetailledObjectError, getDetailledObjectSuccess, getDetailledObject } from "../actions/DetailledObjectActions";
import { NOT_FOUND } from "../utils/errors";
import { parametersFormater } from "../utils/parametersFormater";
import { urlFormater } from "../utils/urlFormater";

export const fetchDetailledObject = (objectId) => {
    return (dispatch) => {
        dispatch(getDetailledObject(objectId))
        
        let url = urlFormater({
            model: "object",
            pk: objectId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
                    .then(rslt => {
                        if (!rslt.ok) {
                            throw new Error(NOT_FOUND)
                        }

                        return rslt.json()
                    })

                    .then((object) => {
                        dispatch(getDetailledObjectSuccess(object))
                    })

                    .catch ((error) => {
                        dispatch(getDetailledObjectError(error))
                    })

    }
}