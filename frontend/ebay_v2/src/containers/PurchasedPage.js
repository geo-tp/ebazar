import { Component } from "react";
import TransactionList from "../components/TransactionList"
import Loading from "../components/Loading"

import { connect } from "react-redux";
import { purchasedObjectSelector } from "../selectors/ObjectSelectors";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchPurchasedObjects } from "../thunks/PurchasedObjectThunk";
import PurchasedSelectionButton from "../components/PurchasedSelectionButton";


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

        this.fetchAndOrganizePurchasedObjects()


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

    async fetchAndOrganizePurchasedObjects() {
        
        let response;

        if (!this.props.purchasedObjects.loaded) {
            
            response = await this.props.fetchPurchasedObjects(this.props.auth.basicUser.id)
        }

        else {
            response=1
        }

        if (await response) {

            let catUnpaid= [];
            let catInProgress = [];
            let catComplete = [];
            let catAll = [];
            this.props.purchasedObjects.loaded &&
            this.props.purchasedObjects.items.results.map((selledObject, index) => {

                if (selledObject.isComplete) {
                    catComplete.push(selledObject)
                }

                else if (selledObject.isPaid && !selledObject.isShipped) {
                    catUnpaid.push(selledObject)
                }

                else if (selledObject.isPaid && !selledObject.isComplete) {
                    catInProgress.push(selledObject)
                }

                catAll.push(selledObject)

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
        console.log("STATE", this.state)
        return(
            <div className="main-selled">
                <h3>Vos Achats</h3>
         
                {this.props.purchasedObjects.loaded && <PurchasedSelectionButton
                                        handleCatChange={this.handleCatChange}
                                        selected={this.state.actualCatInViewIndex}/>}
                {this.state.actualObjectsInView && <TransactionList type="purchased"
                                                                    objects={this.state.actualObjectsInView}/>}

                {!this.props.purchasedObjects.loaded && <Loading/>}

            </div>
        )
    }
}

const PurchasedPage = connect(
    (state) => ({
        auth: authSelector(state),
        purchasedObjects: purchasedObjectSelector(state)
    }),

    (dispatch) => ({
        fetchPurchasedObjects: (userId) => dispatch(fetchPurchasedObjects(userId))
    })

)(Purchased)

export default PurchasedPage