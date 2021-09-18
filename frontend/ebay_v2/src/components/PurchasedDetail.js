import { Component } from "react";
import { convertRawDateToCondensed } from "../utils/timeConverters";
import PayPal from "./Paypal";
import PropTypes from 'prop-types'


class PurchasedDetail extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            
        })
    }

    render() {
        return(
            <div className="main-selled-detail">

                <div className="main-selled-detail__detail-box2">
                    <div className="main-selled-detail__detail-box2__box">
                        <ul>
                            <h4>Actions</h4>
                            {this.props.purchase.isShipped && this.props.purchase.isComplete ?
                                                                      <li><button>Noter le vendeur</button></li>
                                                                                       :
                                                                     this.props.purchase.isPaid && <li><button>Confirmer la reception</button></li>}
                            {this.props.purchase.isComplete && <li><a>Telecharger facture</a></li>}
                            <li><a>Contacter le vendeur</a></li>
                            <li><a>Signaler un problème</a></li>
                        </ul>
                    </div>
                </div>



                <div className="main-selled-detail__detail-box3">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>{convertRawDateToCondensed(this.props.purchase.obj.endingDate)}</td>
                            </tr>
                            <tr>
                                <td>Vendeur</td>
                                <td>{this.props.purchase.user.username}</td>
                            </tr>
                            <tr>
                                <td>Prix de l'object</td>
                                <td>{this.props.purchase.obj.actualPrice} €</td>
                            </tr>
                            <tr>
                                <td>Frais de Port</td>
                                <td>{this.props.purchase.obj.shippingPrice} €</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{this.props.purchase.obj.actualPrice+ this.props.purchase.obj.shippingPrice} €</td>
                            </tr>

                        </tbody>
                    </table>
                    <p className="main-selled-detail__detail-box3__purchase-is-completed">{this.props.purchase.isComplete && "La vente a été finalisée"}</p>
                    <p className="main-selled-detail__detail-box3__purchase-is-shipped">{this.props.purchase.isShipped && !this.props.purchase.isComplete && "Le colis a été envoyé"}</p>
                    <p className="main-selled-detail__detail-box3__purchase-is-unpaid">{!this.props.purchase.isPaid && "Paiement de l'achat en attente"}</p>
                    <p className="main-selled-detail__detail-box3__purchase-is-paid">{this.props.purchase.isPaid && !this.props.purchase.isShipped && "Paiement effectué"}</p>
                    <p className="main-selled-detail__detail-box3__purchase-cancel-link"><a>{!this.props.purchase.isComplete && "Annuler l'achat" }</a></p>

                </div>
                <div className="main-selled-detail__detail-box1">
                    <p className="main-selled-detail__detail-box1__box">
                       {this.props.purchase.isPaid ? <div><h4>Expédition</h4></div> : <div><h4>Paiement</h4><PayPal value={this.props.purchase.obj.actualPrice}
                                                                                                                    item_table_index={this.props.index}
                                                                                                                    purchase_id={this.props.purchase.id}
                                                                                                                    token={this.props.token}
                                                                                                                    handlePaidConfirmation={this.props.handlePaidConfirmation}
                                                                                                                    /></div>}
                       {this.props.purchase.isShipped && 
                                            <div>
                                                <p>N°{this.props.purchase.shippingNumber ? 
                                                                                    this.props.purchase.shippingNumber
                                                                                         :
                                                                                    " Non renseigné"}
                                                </p>
                                                <p>Service : {this.props.purchase.shippingCompany ? 
                                                                                    this.props.purchase.shippingPrice
                                                                                                  :
                                                                                    "Non renseigné"}
                                                </p>
                                                {this.props.purchase.shippingNumber &&
                                                    this.props.purchase.shippingCompany &&
                                                                <button>Suivre le colis</button>}

                                            </div>}
                    </p>
                    {!this.props.purchase.isShipped && this.props.purchase.isPaid
                                                        && <p>Vous serez informé dès que le vendeur confirmera l'envoi de votre commande</p>}
                </div>

            </div>
        )
    }
} 

PurchasedDetail.propTypes = {
    purchase: PropTypes.object.isRequired
}


export default PurchasedDetail