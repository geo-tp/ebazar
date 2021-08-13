import { editUser, editUserError, editUserSuccess, 
         getDetailledUser, getDetailledUserError, getDetailledUserSuccess, 
         getUser, getUserError, getUserSuccess } from "../actions/UserActions"
import { API_USER } from "../utils/apiEndPoints"
import { NOT_FOUND } from "../utils/errors"
import { parametersFormater } from "../utils/parametersFormater"
import { urlFormater } from "../utils/urlFormater"

export const fetchUser = (userId) => {
    return(dispatch) => {
        dispatch(getUser(userId))

        let url = urlFormater({
            model:API_USER,
            pk: userId
        })

        let params = parametersFormater("GET")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error ("Error - 404 Not Found")
                }

                return rslt.json()
            })

            .then(user => {
                dispatch(getUserSuccess(user))
            })

            .catch(error => {
                dispatch(getUserError(error))
            })
    }
}


export const fetchEditUser = (userId, modification) => {
    return(dispatch) => {
        dispatch(editUser(userId, modification))

        let url = urlFormater({
            model: API_USER,
            pk: userId
        })

        let params = parametersFormater("PATCH", modification)

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(userModified => {
                dispatch(editUserSuccess(userModified))

                return true
            })

            .catch(error => {
                dispatch(editUserError(error))

                return false
            })
    }
}
