import { Component } from "react";
import TransactionList from "../components/TransactionList"
import Loading from "../components/Loading"

import { connect } from "react-redux";
import { authSelector } from "../selectors/AuthSelectors";
import PurchasedSelectionButton from "../components/PurchasedSelectionButton";
import { purchasedTransactionSelector } from "../selectors/TransactionSelectors";
import { fetchPurchasedTransaction } from "../thunks/PurchasedTransactionThunk";


class Purchased extends Component {

    constructor(props) {
        super(props)
        this.state = {
            catUnpaid: null,
            catInProgress: null,
            catComplete: null,
            catAll: null,

            actualObjectsInView: null,
            actualCatInViewIndex: 4,
        }

        this.fetchAndOrganizePurchasedTransactions()


    }

    // async fetchPurchasedObjects() {

    //     let response = await this.props.fetchpurchasedObjects(this.props.auth.basicUser.id)

    //     if (await response) {
            
    //         await this.organizepurchasedObjects()
    //     }
    // }


    // componentDidMount() {
    //     this.requestForSelledObject()
    // }

    // requestForSelledObject() {

    //     let url = request_formatter({
    //         model: "purchased-object",
    //         filter_field: "obj__user__id",
    //         filter_value: this.props.user.id,
    //         ordering: "-id"
    //     })

    //     let headers = BASIC_HEADER
    //     headers["Authorization"] = 'token '+this.props.token

    //     fetch(url ,{
    //         method:"GET",
    //         headers: headers
    //     })
    //         .then(rslt => rslt.json())
    //         .then(rslt_json => this.setState({purchasedObjects: rslt_json.results}, console.log(this.state.purchasedObjects)))
    //         .then(() => this.organizePurchasedObjects())
    // }

    async fetchAndOrganizePurchasedTransactions() {
        
        let response;

        if (!this.props.purchasedTransactions.loaded) {
            
            response = await this.props.fetchPurchasedTransaction(this.props.auth.basicUser.id)
        }

        else {
            response=1
        }

        if (await response) {

            let catUnpaid= [];
            let catInProgress = [];
            let catComplete = [];
            let catAll = [];
            this.props.purchasedTransactions.loaded &&
            this.props.purchasedTransactions.items.results.map((selledTransaction, index) => {

                if (selledTransaction.isComplete) {
                    catComplete.push(selledTransaction)
                }

                else if (selledTransaction.isPaid && !selledTransaction.isShipped) {
                    catUnpaid.push(selledTransaction)
                }

                else if (selledTransaction.isPaid && !selledTransaction.isComplete) {
                    catInProgress.push(selledTransaction)
                }

                catAll.push(selledTransaction)

            })

            this.setState({catUnpaid: catUnpaid,
                        catInProgress: catInProgress,
                        catComplete: catComplete,
                        catAll: catAll,
                        actualObjectsInView: catAll})

        }
    }

    handleCatChange = (cat) => {


        let newCat = null

        switch (cat) {

            case 1:
                newCat = this.state.catUnpaid
                break;

            case 2:
                newCat = this.state.catInProgress
                break;

            case 3:
                newCat = this.state.catComplete
                break;

            case 4:
                newCat = this.state.catAll
                break;

        }

        this.setState({actualObjectsInView: newCat,
                       actualCatInViewIndex: cat})
    }


    render() {
        return(
            <div className="main-selled">
                <h3>Vos Achats</h3>
         
                {this.props.purchasedTransactions.loaded && <PurchasedSelectionButton
                                        handleCatChange={this.handleCatChange}
                                        selected={this.state.actualCatInViewIndex}/>}
                {this.state.actualObjectsInView && <TransactionList type="purchased"
                                                                    objects={this.state.actualObjectsInView}/>}

                {!this.props.purchasedTransactions.loaded && <Loading/>}

            </div>
        )
    }
}

const PurchasedPage = connect(
    (state) => ({
        auth: authSelector(state),
        purchasedTransactions: purchasedTransactionSelector(state)
    }),

    (dispatch) => ({
        fetchPurchasedTransaction: (userId) => dispatch(fetchPurchasedTransaction(userId))
    })

)(Purchased)

export default PurchasedPage