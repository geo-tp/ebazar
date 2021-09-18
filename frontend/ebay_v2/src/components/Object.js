import { Component } from "react";
import { convertDateToTimeLeft } from "../utils/timeConverters";
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

class Obj extends Component{

    constructor(props) {
        super(props)

        this.state = {

            redirection: 0,
            redirect_to_index: null,
        }
    }

    render() {

        return(
            <div className="main-object">
                <NavLink className="no-underline" to ={"/detail/"+this.props.object.id}>
                    <div className="main-object__image">
                        <img src={this.props.object.mainImage}/>
                    </div>
                    <div className="main-object__informations">
                        <h3 className="main-object__informations__title">{this.props.object.title}</h3>
                        <h4 className="main-object__informations__price"><strong><i className="fa"/>{this.props.object.actualPrice} €</strong></h4>

                        <table className="main-object__informations__table">
                            <tbody>
                                <tr>
                                    <td>Livraison {this.props.object.shippingPrice > 0 ? 
                                                            
                                                        " : " + this.props.object.shippingPrice+' €' :
                                                        " gratuite" }</td>
                                    <td>Retour : {this.props.object.returnPolicy ? "Oui" : "Non"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="main-object__informations__duration">Il reste {convertDateToTimeLeft(this.props.object.endingDate)}</p>
                    </div>
                </NavLink>
            </div>
        )
    }

}

Obj.propTypes = {
    object: PropTypes.object.isRequired
}

export default Obj