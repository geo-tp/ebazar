import {Component} from "react"
import PropType from "prop-types"
import { UPDATE_PROFILE_SUCCESS } from "../utils/success"
import { UPDATE_PROFILE_ERROR } from "../utils/errors"

class AccountProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            street_number: this.props.user.item.street_number,
            street_type: this.props.user.item.street_type,
            street_name: this.props.user.item.street_name,
            city_number: this.props.user.item.city_number,
            city: this.props.user.item.city,
            paypal_email: this.props.user.item.paypal_email,
            iban: this.props.user.item.iban,
            card_number: this.props.user.item.card_number,
            card_expiration: this.props.user.item.card_expiration,
            card_owner_name: this.props.user.item.card_owner_name,

            message_address_save : "",
            message_card_save : "",
            message_payment_save: ""

        }
    }

    checkUpdateSuccess(response, type) {

        if (response) {
            
            switch (type) {
                case "card":
                    this.setState({message_card_save: UPDATE_PROFILE_SUCCESS})
                    break;
                
                case "payment":
                    this.setState({message_payment_save: UPDATE_PROFILE_SUCCESS})
                    break;

                case "address":
                    
                    this.setState({message_address_save: UPDATE_PROFILE_SUCCESS})
                    break;
            }
        }

        else {
            switch (type) {
                case "card":
                    this.setState({message_card_save: UPDATE_PROFILE_ERROR})
                    break;
                
                case "payment":
                    this.setState({message_payment_save: UPDATE_PROFILE_ERROR})
                    break;

                case "address":
                    
                    this.setState({message_address_save: UPDATE_PROFILE_ERROR})
                    break;
            }
        }
    }

    async handleCardSave(e)  {
        

        e.preventDefault()


        let response = await this.props.fetchEditUser(
            this.props.user.item.id,
            {
                card_number: this.state.card_number,
                card_expiration: this.state.card_expiration,
                card_owner_name: this.state.card_owner_name,
            }
        )

        this.checkUpdateSuccess(response, "card")
        

    }

    async handleAdressChange(e) {
        
        e.preventDefault()

        let response = await this.props.fetchEditUser(
            this.props.user.item.id,
            {
                street_number: this.state.street_number,
                street_type: this.state.street_type,
                street_name: this.state.street_name,
                city: this.state.city,
                city_number: this.state.city_number
            }
        )

        this.checkUpdateSuccess(response, 'address')
        
    }

    async handlePaymentSave(e) {
        e.preventDefault()

        let response = await this.props.fetchEditUser(
            this.props.user.item.id,
            {
                paypal_email: this.state.paypal_email,
                iban: this.state.iban,
            }
        )

        this.checkUpdateSuccess(response, "payment")
        
    }
    render = () => {
        return(
            <div>
                <h3>Profile</h3>
                <div className='main-account-profile'>
                    <div className="main-account-profile__user-infos">
                        <form onSubmit={e => this.handleAdressChange(e)}>
                            <table>
                                <tbody>
                                    <h4>Compte</h4>
                                    <tr>
                                        <td>Nom</td>
                                        <td>{this.props.user.item.last_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Prenom</td>
                                        <td>{this.props.user.item.first_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Pseudo</td>
                                        <td>{this.props.user.item.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{this.props.user.item.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Mot de passe</td>
                                        <td><button>Changer</button></td>
                                    </tr>
                                    <tr>
                                        <td>Date de naissance</td>
                                        <td>{this.props.user.item.date_of_birth}</td>
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
                            <button className='main-acount-profile__user-infos__save' type="submit">Enregistrer</button>
                            <p>{this.state.message_address_save}</p>
                        </form>

                        <form className="main-account-profile__user-payments" 
                            onSubmit={(e) => this.handlePaymentSave(e)}>
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
                            <button className='main-acount-profile__user-payment__save' type="submit">Enregistrer</button>
                            <p>{this.state.message_payment_save}</p>
                            <p></p>
                        </form>

                        <form className="main-acount-profile__card" onSubmit={(e) => this.handleCardSave(e)}>
                            <table>
                                <tbody>
                                    <h4>Carte bancaire</h4>
                                    <tr>
                                        <td>Numero de carte</td>
                                        <td><input onChange={(e) => this.setState({card_number:e.target.value})}
                                                name='card-number' value={this.props.user.item.card_number} type="text" maxLength="16" required></input></td>
                                    </tr>
                                    <tr>
                                        <td>Expiration</td>
                                        <td><input onChange={(e) => this.setState({card_expiration:e.target.value})}
                                                name="card-expiration" value={this.props.user.item.card_expiration} type="text" maxLength="5" required></input></td>
                                    </tr>
                                    <tr>
                                        <td>Nom du porteur</td>
                                        <td><input onChange={(e) => this.setState({card_owner_name:e.target.value})}
                                                name="card-owner-name" value={this.props.user.item.card_owner_name} 
                                                type="text" maxLength="100" 
                                                required></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='main-acount-profile__card__save' type="submit">Enregistrer</button>
                            <p>{this.state.message_card_save}</p>
                        </form>
                            <p></p>
                    </div>
                </div>
            </div>
        )
    }
}

AccountProfile.propTypes = {
    user: PropType.object.isRequired,
    fetchEditUser: PropType.object.isRequired
    
}

export default AccountProfile