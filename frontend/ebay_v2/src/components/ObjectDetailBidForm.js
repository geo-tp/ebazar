import { Component } from "react";
import { fetchCreateBid } from "../fetch/BidFetch";
import { BID_ERROR } from "../utils/errors";
import { BID_SUCCESS } from "../utils/success";
import PropTypes from 'prop-types'



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

        console.log(Number(this.props.objectPrice), Number(this.state.bid_price))
        if (this.props.objectPrice >= this.state.bid_price) {
            this.setState({info:"L'enchère est trop basse, prix actuel: "+ this.props.objectPrice + " €"})
            return
        }

        let rslt = await fetchCreateBid(Number(this.state.bid_price), this.props.userId, this.props.objectId)

        if (rslt.hasOwnProperty("detail")) {
            this.setState({info:rslt.detail})
        }

        else if (rslt.hasOwnProperty("id")) {
            this.setState({info:BID_SUCCESS})
            this.props.updatePrice(rslt.price)
            
        }
        else if (rslt.hasOwnProperty("price")) {
            this.setState({info:rslt.price})
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

ObjectDetailBidForm.propTypes = {
    userId:PropTypes.number.isRequired,
    objectPrice: PropTypes.number.isRequired,
    updatePrice: PropTypes.number.isRequired,
}



export default ObjectDetailBidForm