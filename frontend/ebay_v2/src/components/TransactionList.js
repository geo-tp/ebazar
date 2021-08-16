import { Component } from "react";
import SelledDetail from "./SelledDetail";
import PropTypes from "prop-types"
import { convertDateToDuration } from "../utils/timeConverters";
import { NO_OBJECT_TO_RENDER } from "../utils/errors";
import PurchasedDetail from "./PurchasedDetail"

class TransactionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailBoxOpen : 0,
            detailBoxItem : null,
            selected: null,
        }
    }

    stateOfSale(object) {

        let answer;

        if (object.isComplete) {
            answer = "Finalisée"
        }

        else if(object.isCanceled) {
            answer = "Annulée"
        }

        else if (object.isShipped) {

            if (object.shippingNumber) {
                answer = "Suivi"
           
            }

            else {
                answer = "Envoyée"
            }
        }

        else if (object.isPaid) {
            answer = "A Envoyer"
        }

        else {
            answer = "Non payée"
        }

        return <button className="status-button">{answer}</button>

    }

    handleDetailBoxCLick(index, object) {

        console.log(index)
        
        if (index == this.state.selected && this.state.detailBoxOpen) {
            this.setState({detailBoxOpen: 0,
                           selected: index})
            return
        }

        this.setState({detailBoxOpen: 1,
                       selected:index})
    } 

    render() {

        console.log("objects", this.props.objects)
        return( 
            <div className="main-transaction-list">
                <table className="main-transaction-list__table">
                    <tbody>
                        
                        { this.props.objects.map((object, index) => {

                            return(<tr className="main-transaction-list__table__purchased" onClick={() => this.handleDetailBoxCLick(index, object)}>

                                        <div className="main-transaction-list__table__purchased__container">
                                            <td className="main-transaction-list__table__purchased__container__id">{object.id}</td>
                                            <td className="main-transaction-list__table__purchased__container__title">{object.obj.title}</td>
                                            <td className="main-transaction-list__table__purchased__container__img"><img src={object.obj.mainImage}></img></td>
                                            <td className="main-transaction-list__table__purchased__container__price">{object.obj.actualPrice+object.obj.shippingPrice} €</td>
                                            <td className="main-transaction-list__table__purchased__container__status">
                                                {this.stateOfSale(object)}
                                            </td>
                                            <td className="main-transaction-list__table__purchased__container__date">
                                                {"Il y a " + convertDateToDuration(object.obj.endingDate)}
                                            </td>
                                        </div>

                                        <div>
                                            {this.state.selected == index && !!this.state.detailBoxOpen &&
                                                this.props.type == "selled" && <SelledDetail selled={object}/>}
                                            
                                            {this.state.selected == index && !!this.state.detailBoxOpen &&
                                                this.props.type == "purchased" && <PurchasedDetail purchase={object}/>}
                                                   
                                                                        
                                        </div>
                                    </tr>)
                                    
                            })
                        }
                    </tbody>
                </table>
                {this.props.objects.length == 0 && 
                    <p className="main-transaction-list__no-object-label">{NO_OBJECT_TO_RENDER}</p>}
            </div>
        )
    }
}

TransactionList.propTypes = {
    objects: PropTypes.object.isRequired
}

export default TransactionList