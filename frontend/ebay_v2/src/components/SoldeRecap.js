import { Component } from "react";
import PropTypes from 'prop-types'


class SoldeRecap extends Component {

    render = () => {
        return(<div className="main-solde-recap">
                    <div className="main-solde-recap__buyer-activity">
                        <div>
                            <a
                               onClick={null}>
                                <h2 className="main-solde-recap__buyer-activity__solde-recap-waiting">{this.props.balance.item.waitingConfirmationAmount}</h2>
                            </a>
                            <p><i class="fa fa-2x fa-euro"></i></p>
                            <p>En Attente</p>
                        </div>
                        <div>
                            <a
                               onClick={() => this.props.handleActivityClick("followed_objects", 2)}>
                                <h2 className="main-solde-recap__buyer-activity__solde-recap-payable">{this.props.balance.item.payableAmount}</h2>
                            </a>
                            <p><i class="fa fa-2x fa-euro"></i></p>
                            <p>Payable</p>
                        </div>
                        <div>
                            <a
                               onClick={() => this.props.handleActivityClick("followed_objects", 2)}>
                                <h2 className="main-solde-recap__buyer-activity__solde-recap-paid">{this.props.balance.item.paidAmount}</h2>
                            </a>
                            <p><i class="fa fa-2x fa-euro"></i></p>
                            <p>Deja payé</p>
                        </div>
                    </div>

                    <div className="main-solde-recap__solde-box-form">
                        <form onSubmit={(e) => this.props.handleWithdrawClick(e)}>
                            <h4>Effectuer un reversement</h4>
                            {(this.props.user.item.paypal_email != ""  || this.props.user.item.iban != "") ?
                            <table>
                                <tbody>
                                    <tr>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p>Moyen de paiement</p>
                                            <select>
                                                <option name="paypal" value={1} >Paypal</option>
                                                <option value={2}>Compte bancaire</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><input placeholder={"MONTANT MAX  "+this.props.balance.payableAmount+" €"}></input></td>
                                    </tr>
                                    <tr>
                                        <td><button type="submit">Confirmer</button></td>
                                    </tr>
                                    <p>{this.props.withdrawal_confirmation}</p>
                            </tbody>
                            </table>
                                                                                                         :
                            <p>Vous devez enregistrer vos moyens de paiment</p>

                            }
                        </form>
                    </div>
               </div>
        )
    
    }
}

SoldeRecap.propTypes = {
    user: PropTypes.object.isRequired,
    balance: PropTypes.object.isRequired,
    operations: PropTypes.object.isRequired,
    withdrawal_confirmation: PropTypes.object.isRequired,
}

export default SoldeRecap