import PropType from "prop-types"
import { Component } from "react"
import { deleteUserData } from "../utils/cookieHandler"

class AccountConfiguration extends Component {

    handleLogout() {
        this.props.fetchLogout(this.props.userId)
        deleteUserData()
    }

    render() {
        return(
            <div>
                <h3>Configuration</h3>
                <div className="main-account-configuration">
                    <button onClick={() => this.handleLogout()}>Déconnexion</button>                    
                    <button>Contact</button>
                    <button>Verification</button>
                    <button>Clé API</button>
                    <button>Vos infos</button>
                </div>
            </div>
        )
    }
}

AccountConfiguration.propTypes = {
    userId: PropType.string.isRequired,
    fetchLogout: PropType.func.isRequired
}

export default AccountConfiguration