import PropType from "prop-types"
import { Component } from "react"

class AccountConfiguration extends Component {

    render() {
        return(
            <div>
                <h3>Configuration</h3>
                <div className="main-account-configuration">
                    <button onClick={() => this.props.fetchLogout(this.props.userId)}>Déconnexion</button>                    
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