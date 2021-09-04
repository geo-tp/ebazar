import { Component } from "react";
import { convertRawDateToCondensed } from "../utils/timeConverters";

class SoldeList extends Component {

    render() {
        return(
            <div className="main-solde-list">
                <h4>Crédits</h4>
                
                <div className="operations">
                    <table className="main-operations-table">
                        <tbody>
                            { this.props.operations.items.results.map((credit) => {
                                if (credit.isType == 2) {
                                    return(<tr className="purchased">

                                                <div>
                                                    <td className="purchased-object-id">{credit.id}</td>
                                                    <td className="purchased-object-title">{credit.paymentMethod}</td>
                                                    <td>{convertRawDateToCondensed(credit.date)}</td>
                                                    <td className="purchased-object-img">+{credit.amount} €</td>
                                                </div>
                                            </tr>)
                                }
                             })}
                        </tbody>
                    </table>
                    {this.props.operations.length == 0 && <p className="no-question-label">Aucune opération pour le moment.</p>}
                </div>

                <h4>Débits</h4>
                
                <div className="operations">
                    <table className="main-operations-table">
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

export default SoldeList