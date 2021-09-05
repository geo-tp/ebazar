import { Component } from "react";
import TransactionList from "../components/TransactionList"
import Loading from "../components/Loading"
import PropTypes from "prop-types"

import { connect } from "react-redux";
import { selledObjectSelector } from "../selectors/ObjectSelectors";
import SelledSelectionButton from "../components/SelledSelectionButton";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchSelledTransaction } from "../thunks/SelledTransactionThunk";

class Selled extends Component {

    constructor(props) {
        super(props)
        this.state = {
            catToShip: null,
            catInProgress: null,
            catComplete: null,
            catAll: null,

            actualObjectsInView: null,
            actualCatInViewIndex: 4,
        }

        this.fetchAndFormat()


    }

    async fetchAndFormat() {

        let response = await this.props.fetchSelledTransaction(this.props.auth.basicUser.id)

        if (await response) {
            
            await this.fetchAndOrganizeSelledTransactions()
        }
    }


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
    //         .then(rslt_json => this.setState({selledObjects: rslt_json.results}, console.log(this.state.selledObjects)))
    //         .then(() => this.organizePurchasedObjects())
    // }

    async fetchAndOrganizeSelledTransactions() {
        
        let response;

        if (!this.props.selledObjects.loaded) {
            
            response = await this.props.fetchSelledTransaction(this.props.auth.basicUser.id)
        }

        else {
            response=1
        }

        if (await response) {

            let catToShip= [];
            let catInProgress = [];
            let catComplete = [];
            let catAll = [];
            this.props.selledObjects.loaded &&
            this.props.selledObjects.items.results.map((selledObject, index) => {

                if (selledObject.isComplete) {
                    catComplete.push(selledObject)
                }

                else if (selledObject.isPaid && !selledObject.isShipped) {
                    catToShip.push(selledObject)
                }

                else if (selledObject.isPaid && !selledObject.isComplete) {
                    catInProgress.push(selledObject)
                }

                catAll.push(selledObject)

            })

            this.setState({catToShip: catToShip,
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
                newCat = this.state.catToShip
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
                <h3>Vos Ventes</h3>
         
                {this.props.selledObjects.loaded && <SelledSelectionButton
                                        handleCatChange={this.handleCatChange}
                                        selected={this.state.actualCatInViewIndex}/>}
                {this.state.actualObjectsInView && <TransactionList type="selled"
                                                                    objects={this.state.actualObjectsInView}/>}

                {!this.props.selledObjects.loaded && <Loading/>}

            </div>
        )
    }
}

Selled.propsType= {
    
}

const SelledPage = connect(
    (state) => ({
        auth: authSelector(state),
        selledObjects: selledObjectSelector(state)
    }),

    (dispatch) => ({
        fetchSelledTransaction: (userId) => dispatch(fetchSelledTransaction(userId)),
    })

)(Selled)

export default SelledPage