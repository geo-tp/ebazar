import { createAccount, createAccountSuccess, createAccountError, 
         deleteAccount, deleteAccountError, deleteAccountSuccess, 
         getConnected, getConnectedError, getConnectedSuccess, 
         getDisconnected, getDisconnectedError, getDisconnectedSuccess } from "../actions/AuthActions";
import { addTokenToBasicHeader } from "../utils/APIConfig";

import { NOT_FOUND } from "../utils/errors";
         
import { parametersFormater } from "../utils/parametersFormater";
import { urlFormater } from "../utils/urlFormater";

export const fetchLogin = (mail, password) => {
    return (dispatch) => {
        dispatch(getConnected(mail, password))

        let url = urlFormater({
            model: "rest-auth/login"
        })

        let params = parametersFormater("POST", {email:mail, password:password})

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error(NOT_FOUND)
                }

                return rslt.json()
            })

            .then(userAndToken => {
                console.log("USERANDTO", userAndToken)
                dispatch(getConnectedSuccess(userAndToken))
            })

            .catch(error => {
                console.log(error)
                dispatch(getConnectedError(error))
            })

    }
}

export const fetchLogout = (userId) => {
    return(dispatch) => {
        dispatch(getDisconnected(userId))

        let url = urlFormater({
            model: "rest-auth/logout"
        })

        let params = parametersFormater("POST", {})

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error('Error - 404 Not Found')
                }

                return rslt.json()
            })

            .then(() => {
               dispatch(getDisconnectedSuccess())
            })

            .catch(error => {
                dispatch(getDisconnectedError(error))
            })
    }
}

export const fetchRegistration = (registrationInfos) => {

    return(dispatch) => {
        dispatch(createAccount(registrationInfos))

        let url = urlFormater({
            model: "rest-auth/registration"
        })

        let params = parametersFormater("POST", registrationInfos)

        return fetch(url, params)
            .then(rslt => {
                if(!rslt.ok) {
                    throw new Error('Error - 404 Not Found')
                }

                return rslt.json()
            })

            .then(() => {
                dispatch(createAccountSuccess())
            })

            .catch((error) => {
                console.log(error)
                dispatch(createAccountError(error))
            })
    }
}


export const fetchDeleteAccount = (userId) => {

    return(dispatch) => {
        dispatch(deleteAccount(userId))

        let url = urlFormater({
            model: "user",
            pk: userId
        })

        let params = parametersFormater("DELETE")

        return fetch(url, params)
            .then(rslt => {
                if (!rslt.ok) {
                    throw new Error('Error - 404 Not Found')
                }

                return rslt.json()
            })

            .then(() => {
                dispatch(deleteAccountSuccess())
            })

            .catch(error => {
                dispatch(deleteAccountError(error))
            })
    }
}