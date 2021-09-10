import { Component } from "react";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import SoldePanel from "../components/SoldePanel";
import { balanceSelector } from "../selectors/BalanceSelectors";
import { operationSelector } from "../selectors/OperationSelectors";
import { userSelector } from "../selectors/UserSelectors";
import { fetchUserBalance } from "../thunks/BalanceThunk";
import { fetchCreateOperation, fetchUserOperations } from "../thunks/OperationThunk";

import PropTypes from "prop-types"
import { fetchUser } from "../thunks/UserThunk";
import { authSelector } from "../selectors/AuthSelectors";

class Solde extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: null,
            balance: null,

            withdrawal_confirmation: "",
            fetched: false
        }

        this.fetchAll()

    }

    async fetchAll() {

        await this.props.fetchUser()
        await this.props.fetchUserBalance(this.props.auth.basicUser.id)
        await this.props.fetchUserOperations(this.props.auth.basicUser.id)

    }

    componentDidMount() {
    }


    handleWithdrawClick = (e) => {

        e.preventDefault()

        let paymentMethod = e.target[0].selectedOptions[0].value
        let amount = e.target[1].value

        if (amount > this.state.balance.payableAmount) {
            this.setState({withdrawal_confirmation: "Le montant max est "+this.state.balance.payableAmount+' €'})
            return
        }

        this.props.fetchCreateOperation(this.props.user.item, paymentMethod, amount)
        
        
    }

    render() {

        return(
            <div>
                {this.props.balance.loaded && this.props.operations.loaded &&
                <SoldePanel user={this.props.user} 
                            balance={this.props.balance}
                            operations={this.props.operations}
                            withdrawal_confirmation={this.state.withdrawal_confirmation}
                            handleWithdrawClick={this.handleWithdrawClick}/>}

                {!this.props.balance.loaded || !this.props.operations.loaded && 
                            <Loading/>}

            </div>
        )
    }
}

Solde.propsType = {

    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    operations: PropTypes.object.isRequired,
    balance: PropTypes.object.isRequired,

    fetchUser: PropTypes.func.isRequired,
    fetchUserBalance: PropTypes.func.isRequired,
    fetchUserOperations: PropTypes.func.isRequired,
    fetchCreateOperation: PropTypes.func.isRequired,


}

const SoldePage = connect(
    (state) => ({
        auth: authSelector(state),
        user: userSelector(state),
        operations: operationSelector(state),
        balance: balanceSelector(state)
    }),
    (dispatch) => ({
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchUserBalance: (userId) => dispatch(fetchUserBalance(userId)),
        fetchUserOperations: (userId) => dispatch(fetchUserOperations(userId)),
        fetchCreateOperation: (userId, paymentMethod, amount) => dispatch(fetchCreateOperation(userId, paymentMethod, amount))
    })
)(Solde)


export default SoldePage