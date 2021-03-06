import { Component } from "react";
import { convertRawDateToCondensed } from "../utils/timeConverters";
import PropTypes from 'prop-types'

class SoldeList extends Component {

    render() {
        return(
            <div className="main-solde-list">
                <h4>Crédits</h4>
                
                <div className="main-solde-list__operations">
                    <table>
                        <tbody>
                            { this.props.operations.items.results.map((credit) => {
                                if (credit.isType == 2) {
                                    return(<tr>

                                                <div>
                                                    <td>{credit.id}</td>
                                                    <td>{credit.paymentMethod}</td>
                                                    <td>{convertRawDateToCondensed(credit.date)}</td>
                                                    <td>+{credit.amount} €</td>
                                                </div>
                                            </tr>)
                                }
                             })}
                        </tbody>
                    </table>
                    {this.props.operations.length == 0 && <p className="no-question-label">Aucune opération pour le moment.</p>}
                </div>

                <h4>Débits</h4>
                
                <div className="main-solde-list__operations">
                    <table>
                        <tbody>
                            { this.props.operations.items.results.map((debit) => {
                                if (debit.id == 1) {
                                    return(<tr className="purchased">

                                                <div>
                                                    <td className="purchased-object-id">{debit.id}</td>
                                                    <td className="purchased-object-title">{debit.paymentMethod}</td>
                                                    <td>{convertRawDateToCondensed(debit.date)}</td>
                                                    <td className="purchased-object-img">-{debit.amount} €</td>
                                                </div>
                                            </tr>)
                                    } 
                                })
                            }
                        </tbody>
                    </table>
                    {this.props.operations.length == 0 && <p className="no-question-label">Aucun operation pour le moment.</p>}
                </div>
            </div>
            
        )
    }
}

SoldeList.propTypes = {
    operations: PropTypes.object.isRequired
}

export default SoldeList