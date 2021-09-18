import {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { authSelector } from "../selectors/AuthSelectors"
import { acceptCookie } from "../actions/AuthActions"

class CookieBanner extends Component{

    render() {
        return(
            <div className="main-banner-cookie">
            { !this.props.auth.cookieAccept || !this.props.auth.connected &&
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
    auth: PropTypes.object,
    setCookieAccept: PropTypes.func
 }

 export const CookieBannerContainer= connect(
     (state) => ({
        auth: authSelector(state),
     }),
     (dispatch) => ({
         setCookieAccept: () => dispatch(acceptCookie())
     })
 )(CookieBanner)


export default CookieBannerContainer