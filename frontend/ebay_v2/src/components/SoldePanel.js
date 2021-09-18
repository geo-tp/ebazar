import { Component } from "react";
import SoldeList from "./SoldeList"
import SoldeRecap from "./SoldeRecap"
import PropTypes from 'prop-types'


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

SoldePanel.propTypes = {
    user: PropTypes.object.isRequired,
    balance: PropTypes.object.isRequired,
    operations: PropTypes.object.isRequired,
    withdrawal_confirmation: PropTypes.object.isRequired,
    handleWithdrawClick: PropTypes.func.isRequired,
}

export default SoldePanel