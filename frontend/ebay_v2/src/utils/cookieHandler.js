import { acceptCookie, getConnectedSuccess } from "../actions/AuthActions"
import Cookie from 'js-cookie'
import { store } from ".."


  export const deleteUserData = () => {

    Cookie.set("EBAZARTOKEN", "")
    Cookie.set("EBAZARUSER", "")

    this.setState({token: null,
                   user: null,
                   isConnected: 0})
  
    window.location = window.location.origin


  }

  export const retrieveUserData = () => {


    let token = Cookie.get("EBAZARTOKEN")
    let user = Cookie.get("EBAZARUSER")
    let cookieAccepted = Cookie.get("EBAZARACCEPTCOOKIE")

    
    
    if (user && token) {
      user = JSON.parse(user)
      store.dispatch(getConnectedSuccess({user:user, key:token}))
      
    }
    
    if (cookieAccepted) {
      console.log("écoookiiie", cookieAccepted)
      store.dispatch(acceptCookie())
    }

  }


  export const setUserData = (user, token) => {

    Cookie.set("EBAZARTOKEN", token)
    Cookie.set("EBAZARUSER", JSON.stringify(user))

  }

  export const setCookieAccepted = () => {
    Cookie.set("EBAZARACCEPTCOOKIE", 1)
  }