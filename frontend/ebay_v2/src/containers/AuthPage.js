import { Component } from "react";
import {Redirect, withRouter} from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchLogin, fetchRegistration } from "../thunks/AuthThunk";
import { LOGIN_SUCCESS, REGISTRATION_SUCCESS } from "../utils/success";
import { LOGIN_ERROR, MAIL_IS_ALREADY_REGISTERED, PASSWORDS_NOT_EQUALS, PASSWORD_TOO_SMALL, REGISTRATION_ERROR } from "../utils/errors";



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

    async handleRegistration(e) {
        e.preventDefault()

        let fields = []
        for (let field of e.target) {
            if (field.value) {

                fields.push(field.value)
            }
        }

        let [nom, prenom, pseudo, mail, birthDate, pwd1, pwd2] = fields
        console.log(fields)
        if (pwd1 != pwd2) {
            this.setState({registration_message: PASSWORDS_NOT_EQUALS})
            return
        }

        if (pwd1.length < 8) {
            this.setState({registration_message: PASSWORD_TOO_SMALL})
            return
        }

        let response = await this.props.fetchRegistration({
            last_name:nom,
            first_name: prenom,
            email: mail,
            date_of_birth: birthDate,
            password1: pwd1,
            password2: pwd2
        })

        console.log(await response)
        if (response) {

            if (response.hasOwnProperty("email")) {
                this.setState({registration_message: MAIL_IS_ALREADY_REGISTERED})
                return
            }
            this.setState({registration_message: REGISTRATION_SUCCESS})
        }
        
        else {
            this.setState({registration_message: REGISTRATION_ERROR})
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
                    <form onSubmit={(e) => this.handleRegistration(e) }>

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