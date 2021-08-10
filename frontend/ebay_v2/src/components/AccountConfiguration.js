import PropType from "prop-types"
import { Component } from "react"

class AccountConfiguration extends Component {

    render() {
        return(
            <div>
                <h3>Configuration</h3>
                <div className="main-account-configuration">
                    <button onClick={() => this.props.fetchLogout(this.props.userId)} class="delete-button">Déconnexion</button>                    
                    <button>Contacter EBAZAR</button>
                    <button>Verifier le compte</button>
                    <button>Clé API</button>
                    <button>Supprimer le compte</button>
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