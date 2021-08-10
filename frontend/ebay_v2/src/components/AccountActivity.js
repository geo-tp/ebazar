import React, { Component } from "react";
import { Link } from "react-router-dom";


class AccountActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activityIndex: 1
        }
    }


    render() {
        return(
            <div className="main-account-activity">
                <div className="main-account-activity__buttons-list">
                    <Link to='/sell'><button className="account-sale-button"><p>VENDRE</p><i className="fa fa-2x fa-euro"></i></button></Link>
                    <Link to='solde'><button><p>SOLDE</p><i className="fa fa-2x fa-money"></i></button></Link>
                    <Link to='/purchased'><button><p>ACHATS</p><i className="fa fa-2x fa-shopping-cart"></i></button></Link>
                    <Link to='/selled'><button><p>VENTES</p><i className="fa fa-2x fa-balance-scale"></i></button></Link>
                </div>
                <i className="fa fa-money-bill-alt"></i>
                <div className="main-account-activity__container">
                    <div className="main-account-activity__container__activity">
                        <span className="main-account-activity__container__activity__label">Enchères en cours</span>
                        <div>
                            <a className={this.state.activityIndex == 1 ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick("bidded_objects", 1)}>
                                <h2>{1}</h2>
                            </a>
                            <p>Enchèri(s)</p>
                        </div>
                        <div>
                            <a className={this.state.activityIndex == 2 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("followed_objects", 2)}>
                                <h2>{1}</h2>
                            </a>
                            <p>A suivre</p>
                        </div>
                        <div>
                            <a className={this.state.activityIndex == 3 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("purchased_objects", 3)}>
                                <h2>{0}</h2>
                            </a>
                            <p>A Payer</p>
                        </div>
                    </div>
                    <div className="main-account-activity__container__activity">
                        <span className="main-account-activity__container__activity__label">Ventes en cours</span>
                        <div>
                            <a className={this.state.activityIndex == 4 ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick("active_objects", 4)}>
                                <h2>{2}</h2>
                                </a>
                            <p>Vente(s)</p>
                        </div>
                        <div>
                            <a className={this.state.activityIndex == 5 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("saled_objects", 5)}>
                                <h2>{3}</h2>
                            </a>
                            <p>Vendu(s)</p>
                        </div>
                        <div>
                            <a className={this.state.activityIndex == 6 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("ended_objects", 6)}>
                                <h2>{5}</h2>
                            </a>
                            <p>Invendu(s)</p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default AccountActivity