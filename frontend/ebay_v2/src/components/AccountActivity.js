import React, { Component } from "react";
import { Link } from "react-router-dom";


class AccountActivity extends Component {


    render() {
        return(
            <div className="main-account-activity">
                <h3>Activités</h3>
                <div className="main-acount-activity__buttons-list">
                    <Link to='/vendre'><button className="account-sale-button"><p className="top-activity-p">VENDRE</p><i className="fa fa-2x fa-euro"></i></button></Link>
                    <Link to='solde'><button><p className="top-activity-p">SOLDE</p><i className="fa fa-2x fa-money"></i></button></Link>
                    <Link to='/purchased'><button><p className="top-activity-p">ACHATS</p><i className="fa fa-2x fa-shopping-cart"></i></button></Link>
                    <Link to='/selled'><button><p className="top-activity-p">VENTES</p><i className="fa fa-2x fa-balance-scale"></i></button></Link>
                </div>
                <i class="fa fa-money-bill-alt"></i>
                <div className="main-account-activity__container">
                    <div className="main-account-activity__container__buyer-activity">
                        <span className="main-account-activity__container__buyer-activity__label">Enchères en cours</span>
                        <div className="main-account-activity__container__buyer-activity__buttons-box">
                            <a className={this.props.activity_index == 1 ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick("bidded_objects", 1)}>
                                <h2>{this.props.bidded_objects_len}</h2>
                            </a>
                            <p>Enchèri(s)</p>
                        </div>
                        <div>
                            <a className={this.props.activity_index == 2 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("followed_objects", 2)}>
                                <h2>{this.props.followed_objects_len}</h2>
                            </a>
                            <p>A suivre</p>
                        </div>
                        <div>
                            <a className={this.props.activity_index == 3 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("purchased_objects", 3)}>
                                <h2>{this.props.purchased_objects_len}</h2>
                            </a>
                            <p>A Payer</p>
                        </div>
                    </div>
                    <div className="seller-activity">
                        <span className="seller-activity-label">Ventes en cours</span>
                        <div>
                            <a className={this.props.activity_index == 4 ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick("active_objects", 4)}>
                                <h2>{this.props.active_objects_len}</h2>
                                </a>
                            <p>Vente(s)</p>
                        </div>
                        <div>
                            <a className={this.props.activity_index == 5 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("saled_objects", 5)}>
                                <h2>{this.props.saled_objects_len}</h2>
                            </a>
                            <p>Vendu(s)</p>
                        </div>
                        <div>
                            <a className={this.props.activity_index == 6 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("ended_objects", 6)}>
                                <h2>{this.props.ended_objects_len}</h2>
                            </a>
                            <p>Invendu(s)</p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default AccountPanel