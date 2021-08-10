import {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { cookieAcceptSelector } from "../selectors/AuthSelectors"
import { acceptCookie } from "../actions/AuthActions"

class CookieBanner extends Component{

    render() {
        return(
            <div className="main-banner-cookie">
            { !this.props.cookieAccept &&
                <div className="main-banner-cookie__container">
                    <p>Veuillez accepter les conditions d'usage des cookies pour profiter pleinement d'EBAZAR. <a href="">Voir les conditions</a></p>
                    <div>
                        <button onClick={() => this.props.setCookieAccept()}>Accepter</button>
                        <form action="https://google.fr">
                            <button type="submit">Refuser</button>
                        </form>
                    </div>
                </div>
            }
            </div>
        )
    }
}


CookieBanner.propTypes = {
    cookieAccept: PropTypes.number,
    setCookieAccept: PropTypes.func
 }

 export const CookieBannerContainer= connect(
     (state) => ({
        cookieAccept: cookieAcceptSelector(state.auth)
     }),
     (dispatch) => ({
         setCookieAccept: () => dispatch(acceptCookie())
     })
 )(CookieBanner)


export default CookieBannerContainer