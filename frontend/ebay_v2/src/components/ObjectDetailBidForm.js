import { Component } from "react";
import { connect } from "react-redux";
import { fetchCreateBid } from "../fetch/BidFetch";
import { BID_ERROR } from "../utils/errors";
import { BID_SUCCESS } from "../utils/success";



class ObjectDetailBidForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: "",
            bid_price: ''
        }
    }


    async handleBidClick(e) {

        e.preventDefault()

        let rslt = await fetchCreateBid(this.state.bid_price, this.props.userId, this.props.objectId)
        let info;

        if (rslt == 1) {
            info = BID_SUCCESS
            this.props.update()
        }
        else {

            info = BID_ERROR
        }

        
    }


    render() {
        return (
            <div class="bid-box">
                <input onChange={(e) => this.setState({bid_price: e.target.value})} placeholder="Votre prix"></input>
                <button onClick={(e) => this.handleBidClick(e)}>Valider</button>
                <p>{this.state.info}</p>
            </div>
        )
    }
}

ObjectDetailBidForm.propType = {

}

// const ObjectDetailBidFormStore = connect(
//     (state) => ({

//     }),
//     (dispatch) => ({

//     })
// )(ObjectDetailBidForm)

export default ObjectDetailBidForm