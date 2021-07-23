import { getDetailledObjectError, getDetailledObjectSuccess, getDetailledObject } from "../actions/DetailledObjectActions";
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
                            throw new Error("Error - 404 Not Found")
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