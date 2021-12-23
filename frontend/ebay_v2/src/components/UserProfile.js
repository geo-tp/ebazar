import { Component } from "react";
import { Link } from "react-router-dom";
import UserMessageForm from "./UserMessageForm";
import PropTypes from 'prop-types'



class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showMessageForm: 0
        }
    }


    render() {
        return(
                <div class="main-user-profile">
                    <h3>Profil de {this.props.userProfile.username}</h3>
                    <div class="main-user-profile__container">
                        <img src="https://freepngimg.com/download/google/66726-customer-account-google-service-button-search-logo.png"></img>
                        <p>{this.props.userProfile.username}</p>

                        { this.props.auth.connected ?
                        <button onClick={() => this.setState({showMessageForm: !this.state.showMessageForm})}>Contacter</button>
                                                 :
                        <Link to="/auth"><button>Contacter</button></Link>

                        }
                        {!!this.state.showMessageForm && <UserMessageForm auth={this.props.auth} viewedUser = {this.props.userProfile}/>}
                    </div>
                </div>
        )
    }
}

UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired
}


export default UserProfile