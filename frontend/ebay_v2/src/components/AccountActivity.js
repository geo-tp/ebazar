import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import Loading from "./Loading"

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
                            { this.props.biddedObjects.loaded ?
                            <a className={this.props.activityInView == this.props.biddedObjects ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick(this.props.biddedObjects)}>
                                <h2>{this.props.biddedObjects.items.count}</h2>
                            </a>
                                                             :
                            <Loading/> 
                            }
                            <p>Enchèri(s)</p>
                        </div>
                        <div>
                            { this.props.followedObjects.loaded ?
                            <a className={this.state.activityInView == this.props.followedObjects ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick(this.props.followedObjects)}>
                                <h2>{this.props.followedObjects.items.count}</h2>
                            </a>
                                                                :
                            <Loading/> 
                            }
                            <p>A suivre</p>
                        </div>
                        <div>
                        { this.props.purchasedObjects.loaded ?
                            <a className={this.state.activityInView == this.props.purchasedObjects ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("purchased_objects", 3)}>
                                <h2>{this.props.purchasedObjects.items.count}</h2>
                            </a>
                                                            :
                            <Loading/> 
                        }
                            <p>A Payer</p>
                        </div>
                    </div>
                    <div className="main-account-activity__container__activity">
                        <span className="main-account-activity__container__activity__label">Ventes en cours</span>
                        <div>
                        { this.props.activeObjects.loaded ? 
                            <a className={this.state.activityIndex == 4 ? "activity-selected-button" : "activity-button"} 
                               onClick={() => this.props.handleActivityClick("active_objects", 4)}>
                                <h2>{this.props.activeObjects.items.count}</h2>
                            </a>

                                                        :
                            <Loading/> 
                        }
                            <p>Vente(s)</p>
                        </div>
                        <div>
                        { this.props.selledObjects.loaded ?
                            <a className={this.state.activityIndex == 5 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("saled_objects", 5)}>
                                <h2>{this.props.selledObjects.items.count}</h2>
                            </a>
                                                        :
                                                        
                            <Loading/> 
                        }
                            <p>Vendu(s)</p>
                        </div>
                        <div>
                        { this.props.endedObjects.loaded ? 
                            <a className={this.state.activityIndex == 6 ? "activity-selected-button" : "activity-button"}
                               onClick={() => this.props.handleActivityClick("ended_objects", 6)}>
                                <h2>{this.props.endedObjects.items.count}</h2>
                            </a>
                                                        :
                            <Loading/> 
                        }
                            <p>Invendu(s)</p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

AccountActivity.propTypes = {

    biddedObjects: PropTypes.object.isRequired,
    followedObjects: PropTypes.object.isRequired,
    activeObjects: PropTypes.object.isRequired,
    endedObjects: PropTypes.object.isRequired,
    selledObjects: PropTypes.object.isRequired,
    purchasedObjects: PropTypes.object.isRequired
}

export default AccountActivity