import { Component } from "react";
import { detailledObjectBidSelector, detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import PropTypes from "prop-types"
import { connect } from "react-redux";


class ObjectDetailBidList extends Component {

    constructor(props) {
        super(props)
        this.props.fetchBidsOfObject(this.props.detailledObject.item.id)
    }

    render() {
        return(
            
            <div class="bid-list">
                {this.props.bids.loaded && this.props.bids.items.map((bid) => {

                    return(
                        <table>
                            <tbody>
                                <tr>
                                    <td>{bid.user}</td>
                                    <td>{bid.price}€</td>
                                </tr>

                            </tbody>
                        </table>
                )})}
                {!!this.props.bids.loaded == 0 && <p>Aucune enchère pour le moment</p>}
            </div>
        )
    }
}


export const ObjectDetailBidListStore = connect(
    (state) => ({
        detailledObject: detailledObjectSelector(state),
        bids: detailledObjectBidSelector(state)
    }),
    (dispatch) => ({
        fetchBidsOfObject: (objectId) => dispatch(fetchBidsOfObject(objectId))
    })
)(ObjectDetailBidList)
    
    ObjectDetailBidList.propType = {
        detailledObject: PropTypes.object.isRequired,
        bids: PropTypes.object.isRequired,
    
        fetchBidsOfObject: PropTypes.func.isRequired,
    }

export default ObjectDetailBidListStore
