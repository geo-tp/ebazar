import { acceptCookie, getConnectedSuccess } from "../actions/AuthActions"
import Cookie from 'js-cookie'
import { store } from ".."


export const deleteUserData = () => {

    Cookie.remove("EBAZARTOKEN")
    Cookie.remove("EBAZARUSER")
  
    window.location = window.location.origin


}

export const retrieveUserData = () => {

  console.log("STORE GET STATE", store.getState().auth.connected)

  if (!store.getState().auth.connected) {

    let token = Cookie.get("EBAZARTOKEN")
    let user = Cookie.get("EBAZARUSER")
    console.log( "TYPEOF USER",typeof user)
    console.log("TYPEOF TOKEN", typeof token)
    console.log("USER VALUE", user)
    
    let cookieAccepted = Cookie.get("EBAZARACCEPTCOOKIE")
    
    if (user && token) {
      if (token && user) {
        console.log("IN USER AND token")
        user = JSON.parse(user)
        store.dispatch(getConnectedSuccess({ user: user, key: token }))

      }

    }

    if (cookieAccepted) {
      console.log("écoookiiie", cookieAccepted)
      store.dispatch(acceptCookie())
    }

  }


}


export const setUserData = (user, token) => {

  Cookie.set("EBAZARTOKEN", token)
  Cookie.set("EBAZARUSER", JSON.stringify(user))

}

export const setCookieAccepted = () => {
  Cookie.set("EBAZARACCEPTCOOKIE", 1)
}