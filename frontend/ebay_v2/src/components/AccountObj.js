import { Component } from "react";
import { convertDateToTimeLeft } from "../utils/timeConverters";
import {Redirect} from 'react-router';
import PropTypes from 'prop-types'

import {Link} from "react-router-dom"

class Obj extends Component{

    constructor(props) {
        super(props)

        this.state = {

            redirection: 0,
            redirect_to_index: null,
        }
    }

    handleObjectClick(id) {

        window.location = window.location.origin + "/detail/"+ id
    }

    determineWhereToRedirect() {

        console.log("TYPE", this.props.objectsType)

        switch (this.props.objectsType) {
            case "purchasedObjects":
                return "/purchased/"

            case "selledObjects":
                return "/selled/"

            case "endedObjects":
                return "/ended/"

            default:
                return "/detail/"
        }
    }
        

    render() {

        // if (this.state.redirection) {
        //     return <Redirect to={"/object/"+this.state.redirect_to_index}/>
        // }

        return(
            <div className="main-object">

                    <div className="main-object__image">
                        <Link to={this.determineWhereToRedirect()+this.props.object.id}>
                            <img src={this.props.object.mainImage}/>
                        </Link>
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
                </div>
        )
    }


}

Obj.propTypes = {
    object: PropTypes.object.isRequired,
    objectType: PropTypes.string.isRequired

}

export default Obj