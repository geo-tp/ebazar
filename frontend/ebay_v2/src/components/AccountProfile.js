import {Component} from "react"
import {request_formatter,BASIC_HEADER } from "../../../GLOBAL"
import "./style.css"



class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: this.props.user.username,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            email: this.props.user.email,
            date_of_birth: this.props.user.date_of_birth,
            street_number: this.props.user.street_number,
            street_type: this.props.user.street_type,
            street_name: this.props.user.street_name,
            city_number: this.props.user.city_number,
            city: this.props.user.city,
            phone_number: this.props.user.phone_number,
            paypal_email: this.props.user.paypal_email,
            iban: this.props.user.iban,
            card_number: this.props.user.card_number,
            card_expiration: this.props.user.card_expiration,
            card_owner_name: this.props.user.card_owner_name,

            confirm_address_save : "",
            confirm_card_save : "",
            confirm_payment_save: ""

        }
    }

    handleCardSave = (e) => {
        

        e.preventDefault()

        let card_number = e.target['card-number'].value
        let card_expiration = e.target["card-expiration"].value
        let card_owner_name = e.target["card-owner-name"].value

        let url = request_formatter({
            model: "user",
            pk: this.props.user.id
        })

        let headers = BASIC_HEADER
        headers["Authorization"] = "token " + this.props.token
        headers["Content-Type"] = "application/json"

        // delete headers["Content-Type"]

        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                card_number: card_number,
                card_expiration: card_expiration,
                card_owner_name: card_owner_name

            })
        })
            .then(rslt => {
                if (rslt.status == 200) {
                    this.setState({confirm_card_save: "Vos modifications ont été enregistrées"})
                }

                else {
                    this.setState({confirm_card_save: "Une erreur s'est produite"})
                }
            })

            .catch(() => {
                this.setState({confirm_card_save: "Une erreur s'est produite"})

            })

    }

    handleAdressChange = (e) => {
        
        e.preventDefault()

        let url = request_formatter({
            model: "user",
            pk: this.props.user.id
        })

        let headers = BASIC_HEADER
        headers["Authorization"] = "token " + this.props.token
        headers["Content-Type"] = "application/json"

        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                street_number: this.state.street_number,
                street_type: this.state.street_type,
                street_name: this.state.street_name,
                city_number: this.state.city_number,
                city: this.state.city
        })})
            .then(rslt => {
                if (rslt.status == 200) {
                    this.setState({confirm_address_save: "Vos modifications ont été enregistrées"})
                }

                else {
                    this.setState({confirm_address_save: "Une erreur s'est produite"})
                }
            })

            .catch(() => {
                this.setState({confirm_address_save: "Une erreur s'est produite"})

            })

    
        
    }

    handlePaymentSave = (e) => {
        e.preventDefault()

        let url = request_formatter({
            model: "user",
            pk: this.props.user.id
        })

        let headers = BASIC_HEADER
        headers["Authorization"] = "token " + this.props.token
        headers["Content-Type"] = "application/json"


        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                paypal: this.state.paypal,
                iban: this.state.iban,
        })})
        .then(rslt => {
            if (rslt.status == 200) {
                this.setState({confirm_payment_save: "Vos modifications ont été enregistrées"})
            }

            else {
                this.setState({confirm_payment_save: "Une erreur s'est produite"})
            }
        })

        .catch(() => {
            this.setState({confirm_payment_save: "Une erreur s'est produite"})

        })
    }
    render() {
        return(
            <div ref={this.props.profile_ref}>
                <h3>Profile</h3>
                <div className="main-profile">
                    <form onSubmit={e => this.handleAdressChange(e)} className="profile-form">
                        <table className="table-profile">
                            <tbody>
                                <h4>Compte</h4>
                                <tr>
                                    <td>Nom</td>
                                    <td>{this.state.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Prenom</td>
                                    <td>{this.state.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Pseudo</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td>Mot de passe</td>
                                    <td><button>Changer</button></td>
                                </tr>
                                <tr>
                                    <td>Date de naissance</td>
                                    <td>{this.state.date_of_birth}</td>
                                </tr>
                                <h4>Adresse</h4>
                                <tr>
                                    <td>Numero de voie</td>
                                    <td><input onChange={(e) => this.setState({street_number:e.target.value})} 
                                               name="street-number" value={this.state.street_number}
                                               maxLength="10" type="text" required></input></td>
                                </tr>
                                <tr>
                                    <td>Type de voie</td>
                                    <td><input onChange={(e) => this.setState({street_type:e.target.value})}
                                               name="street-type" value={this.state.street_type}
                                               maxLength="20" type="text" required></input></td>
                                </tr>
                                <tr>
                                    <td>Adresse</td>
                                    <td><input onChange={(e) => this.setState({street_name:e.target.value})}
                                               name="street-name" value={this.state.street_name} 
                                               maxLength="200" type="text" required></input></td>
                                </tr>
                                <tr>
                                    <td>Nom de ville</td>
                                    <td><input onChange={(e) => this.setState({city:e.target.value})}
                                               name="city" value={this.state.city}
                                               maxLength="100" type="text" required></input></td>
                                </tr>
                                <tr>
                                    <td>Code postal</td>
                                    <td><input onChange={(e) => this.setState({city_number:e.target.value})}
                                               name = "city-number" value={this.state.city_number}
                                               maxLength="100" type="text" required></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='profile-button' type="submit">Enregistrer</button>
                        <p>{this.state.confirm_address_save}</p>
                    </form>

                    <form onSubmit={(e) => this.handlePaymentSave(e)}>
                        <table>
                            <tbody>
                                <h4>Recevoir vos paiements</h4>
                                <tr>
                                    <td>Paypal</td>
                                    <td><input name="paypal" onChange={(e) => this.setState({paypal_email:e.target.value})}
                                               value={this.state.paypal_email} type="email" maxLength="100" ></input></td>
                                </tr>
                                <tr>
                                    <td>IBAN</td>
                                    <td><input onChange={(e) => this.setState({iban:e.target.value})}
                                               name="iban" value={this.state.iban} type="text" maxLength="20"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='paiement-button' type="submit">Enregistrer</button>
                        <p>{this.state.confirm_payment_save}</p>
                        <p></p>
                    </form>
                    <form onSubmit={(e) => this.handleCardSave(e)}>
                        <table>
                            <tbody>
                                <h4>Carte bancaire</h4>
                                <tr>
                                    <td>Numero de carte</td>
                                    <td><input onChange={(e) => this.setState({card_number:e.target.value})}
                                               name='card-number' value={this.state.card_number} type="text" maxLength="16" required></input></td>
                                </tr>
                                <tr>
                                    <td>Expiration</td>
                                    <td><input onChange={(e) => this.setState({card_expiration:e.target.value})}
                                               name="card-expiration" value={this.state.card_expiration} type="text" maxLength="5" required></input></td>
                                </tr>
                                <tr>
                                    <td>Nom du porteur</td>
                                    <td><input onChange={(e) => this.setState({card_owner_name:e.target.value})}
                                               name="card-owner-name" value={this.state.card_owner_name} type="text" maxLength="100" required></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='paiement-button' type="submit">Enregistrer</button>
                        <p>{this.state.confirm_card_save}</p>
                    </form>
                        <p></p>
                </div>
            </div>
        )
    }
}

export default Profile