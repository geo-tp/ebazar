import { editUser, editUserError, editUserSuccess, 
         getDetailledUser, getDetailledUserError, getDetailledUserSuccess, 
         getUser, getUserError, getUserSuccess } from "../actions/UserActions"


export const fetchUser = (userId) => {
    return(dispatch) => {
        dispatch(getUser(userId))

        let url = urlFormater({
            model: "user",
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

export const fetchDetailledUser = (userId) => {
    return(dispatch) => {
        dispatch(getDetailledUser(userId))

        let url = urlFormater({
            model: "detailled-user",
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
                dispatch(getDetailledUserSuccess(user))
            })

            .catch(error => {
                dispatch(getDetailledUserError(error))
            })
    }
}

export const fetchEditUser = (userId, modification) => {
    return(dispatch) => {
        dispatch(editUser(userId, modification))

        let url = urlFormater({
            model: "user",
            pk: userId
        })

        let params = parametersFormater("PATCH", modification)

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error("Error - 404 Not Found")
                }

                return rslt.json()
            })

            .then(userModified => {
                dispatch(editUserSuccess(userModified))
            })

            .catch(error => {
                dispatch(editUserError(error))
            })
    }
}
