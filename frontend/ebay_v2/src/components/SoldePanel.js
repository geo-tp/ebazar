import { Component } from "react";
import Loading from "./Loading";
import SoldeList from "./SoldeList"
import SoldeRecap from "./SoldeRecap"


class SoldePanel extends Component {

    render() {
        return(
            <div>
                <h3>Solde de votre compte</h3>
                <SoldeRecap
                        user={this.props.user}
                        balance={this.props.balance}
                        withdrawal_confirmation={this.props.withdrawal_confirmation}
                        handleWithdrawClick={this.props.handleWithdrawClick}/>
                <SoldeList
                        operations={this.props.operations}/>
            </div>
        )
    }
}

export default SoldePanel