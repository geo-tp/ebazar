import {Component} from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { cookieAcceptSelector } from "../selectors/AuthSelectors"
import { acceptCookie } from "../actions/AuthActions"

class CookieBanner extends Component{

    handleAcceptClick() {
        this.props.setCookieAccepted(1)
    }

    render() {
        return(
            <div className="banniere-cookie-box">
            { !this.props.cookieAccept &&
                <div className="banniere-cookie-main">
                    <p>Veuillez accepter les conditions d'usage des cookies pour profiter pleinement d'EBAZAR. <a href="">Voir les conditions</a></p>
                    <div>
                        <button onClick={() => this.props.setCookieAccepted()}>Accepter</button>
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

const CookieBannerStore = connect(
    (state) => ({
        cookieAccept: cookieAcceptSelector(state.auth)
    }),
    (dispatch) => ({
        setCookieAccepted: () => dispatch(acceptCookie())
    })
)(CookieBanner)

CookieBanner.propTypes = {
    cookieAccepted: PropTypes.number,
    setCookieAccepted: PropTypes.func
 }


export default CookieBannerStore