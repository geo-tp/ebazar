import { Component } from "react";
import {Redirect, withRouter} from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchLogin, fetchRegistration } from "../thunks/AuthThunk";
import { LOGIN_SUCCESS } from "../utils/success";
import { LOGIN_ERROR } from "../utils/errors";



class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            connection_message : "",
            registration_message : "",
            user_data: {},

            connection_email: "",
            connection_password: "",

            redirectToAccount: false
        }
    }

    async handleLogin(e) {

        e.preventDefault()

        let response = await this.props.fetchLogin(
                                this.state.connection_email, 
                                this.state.connection_password
        )

        if (response) {
            this.setState({connection_message: LOGIN_SUCCESS,
                           redirectToAccount: true})
        }

        else {
            this.setState({connection_message: LOGIN_ERROR})
        }




    }


    render = () => {

        if (this.state.redirectToAccount) {
            return <Redirect to='/account/'/>
        }

        return(
            <div className="main-auth">
                <div className="main-auth__connection-box">
                    <h2>Se connecter</h2>

                    <form onSubmit={(e) => this.handleLogin(e)}>
                        <div>
                            <p>Connecter vous pour accéder à toutes les fonctionnalités d'EBAZAR</p>
                            <div>
                                <p>
                                    <input onChange={e => this.setState({connection_email: e.target.value})} 
                                           type="email" 
                                           name="mail-input" 
                                           placeholder="Mail" 
                                           required>
                                    </input>
                                </p>
                                <p>
                                    <input onChange={e => this.setState({connection_password: e.target.value})}
                                           type="password" 
                                           name="password-input" 
                                           placeholder="Mot de passe" 
                                           required>
                                    </input>
                                </p>
                            </div>
                                <p className="alert-box">{this.state.connection_message}</p>
                                <button type="submit">Connexion</button>
                        </div>
                    </form>
                </div>

                <div className="main-auth__register-box">
                    <h2>S'inscrire</h2>
                    <form>

                        <div className="main-auth__register__fields">
                            <p>Un compte pour acheter et vendre</p>
                                <p><input name="name-input" required placeholder="Nom"></input></p>
                                <p><input name="surname-input" required placeholder="Prenom"></input></p>
                                <p><input name="pseudo-input" placeholder="Pseudo" required maxLength="30"></input></p>
                                <p><input type="email" name="mail-input" placeholder="Mail" required maxLength="60"></input></p>
                                <label>Date Naissance :</label>
                                <p><input type="date" name="birth-date-input" placeholder="Date de naissance"></input></p>
                                <p><input type="password" name="password-input" placeholder="Mot de passe" required></input></p>
                                <p><input type="password" name="password-input" placeholder="Répétez Mot de passe" required></input></p>
                            <p className="alert-box">{this.state.registration_message}</p>
                            <button type="submit">Inscription</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export const AuthPage = connect(
    (state) => ({
        auth: authSelector(state)
    }),
    (dispatch) => ({
        fetchLogin: (mail, password) => dispatch(fetchLogin(mail, password)),
        fetchRegistration : (infos) => dispatch(fetchRegistration(infos))
    })
)(Auth)

Auth.propTypes = {
    setUserData: PropTypes.func.isRequired
 }

export default AuthPage