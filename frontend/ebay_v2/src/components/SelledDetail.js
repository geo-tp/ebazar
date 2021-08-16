import { Component } from "react";
import { Link } from "react-router-dom";
import { convertRawDateToCondensed} from "../utils/timeConverters";
import PropTypes from "prop-types"
import PayPal from "./Paypal";


class DetailledSelled extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            
        })
    }

    render() {
        return(
            <div className="main-selled-detail">
                <div className="main-selled-detail__detail-box2">
                    {/* <p className="paypal-detail-box"> */}
                        <h4>Expédition</h4>
                        <p>
                            {this.props.selled.user.first_name+ ' ' + this.props.selled.user.last_name}
                        </p>

                        <p>
                            {this.props.selled.user.street_number + ' ' +
                             this.props.selled.user.street_type + ' ' +
                             this.props.selled.user.street_name}
                        </p>
                        <p>
                            {this.props.selled.user.city_number + " " + this.props.selled.user.city}
                        </p>
                        <img src={this.props.selled.obj.mainImage}/>

                    {/* </p> */}
                </div>



                <div className="main-selled-detail__detail-box3">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>{convertRawDateToCondensed(this.props.selled.obj.endingDate)}</td>
                            </tr>
                            <tr>
                                <td>Acheteur</td>
                                <td>{this.props.selled.user.username}</td>
                            </tr>
                            <tr>
                                <td>Prix de l'object</td>
                                <td>{this.props.selled.obj.actualPrice} €</td>
                            </tr>
                            <tr>
                                <td>Frais de Port</td>
                                <td>{this.props.selled.obj.shippingPrice} €</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{this.props.selled.obj.actualPrice+ this.props.selled.obj.shippingPrice} €</td>
                            </tr>

                        </tbody>
                    </table>
                    <p className="main-selled-detail__detail-box3__purchase-is-completed">
                        {this.props.selled.isComplete && "La vente a été finalisée"}
                    </p>
                    <p className="main-selled-detail__detail-box3__purchase-is-shipped">
                        {this.props.selled.isShipped && !this.props.selled.isComplete && "Le colis a été envoyé"}
                    </p>
                    <p className="main-selled-detail__detail-box3__purchase-is-unpaid">
                        {!this.props.selled.isPaid && "Paiement de l'achat en attente"}
                    </p>
                    <p className="main-selled-detail__detail-box3__purchase-is-paid">
                        {this.props.selled.isPaid && !this.props.selled.isShipped && "Paiement effectué"}
                    </p>
                    <p className="main-selled-detail__detail-box3__purchase-cancel-link">
                        <a>{!this.props.selled.isComplete && "Annuler la vente"}</a>
                    </p>

                </div>
                <div className="main-selled-detail__detail-box1">
                    
                    <div>
                        {/* <h4>Envoi</h4> */}
                        {this.props.selled.isShipped ?
                                                    <div>
                                                        {!this.props.selled.isComplete && <p><button>Marquer non envoyé</button></p>}
                                                        {this.props.selled.shippingNumber ? <p>N°{this.props.selled.shippingNumber}</p>
                                                                                          : <p><button>Ajouter infos de suivi</button></p>}                                                    
                                                    </div>
                                                     :
                                                    <div> 
                                                        <p><button>Marquer envoyé</button></p>
                                                         <p><button>Ajouter infos de suivi</button></p>
                                                    </div>}
                    </div>
                    <div className="main-selled-detail__detail-box1__actions">
                        <ul>
                            {!this.props.selled.isPaid && <li><a>Rappel de paiement</a></li>}
                            <li><a>Contacter l'acheteur</a></li>
                            <li><a>Signaler un problème</a></li>
                            <li><a>Remettre en vente</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
} 


export default DetailledSelled