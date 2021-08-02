import { Component } from "react";
import { connect } from "react-redux";



class ObjectDetailBidForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: "",
            bid_price: ''
        }
    }


    // handleBidClick = (e) => {

    //     let url = request_formatter({model: "bid"})
    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //           "Accept": "application/json",
    //           'Content-Type': 'application/json',
    //           "Authorization": "token "+this.props.token
    //         },
    //         body: JSON.stringify({obj: this.props.obj_id,
    //                               price: this.state.bid_price,
    //                               user: this.props.user.id
    //                               })
    //     })
    //         .then(rslt => rslt.json())
    //         .then(json_data => {
    //             if (json_data.hasOwnProperty('detail')) {
    //                 this.setState({info:json_data.detail})
    //                 this.props.request_for_detailled_object(this.props.obj_id)

    //             }
    //             else if (json_data.hasOwnProperty('id')) {
    //                 this.setState({info: "L'enchère a été validé"})
    //                 this.props.request_for_detailled_object(this.props.obj_id)
    //             }
    //             else {
    //                 this.setState({info:"Vous devez renseigner un nombre valide."})
    //             }
    //         })
    // }


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

const ObjectDetailBidFormStore = connect(
    (state) => ({

    }),
    (dispatch) => ({

    })
)(ObjectDetailBidForm)

export default ObjectDetailBidFormStore