import { Component } from "react";
import { detailledObjectBidSelector, detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { NO_OBJECT_TO_RENDER } from "../utils/errors";


class ObjectDetailBidList extends Component {

    // constructor(props) {
    //     super(props)
    //     this.props.fetchBidsOfObject(this.props.detailledObject.item.id)
    // }

    render() {
        return(
            
            <div className="bid-list">

                    <table>
                        <tbody>
                {this.props.bids.loaded && this.props.bids.items.results.map((bid) => {
                    return(
                                <tr>
                                    <td>{bid.user.username}</td>
                                    <td>{bid.price}€</td>
                                </tr>
                            )

                        })}
                        </tbody>
                    </table>
                    
                {!!this.props.bids.items.count == 0 && <p>{NO_OBJECT_TO_RENDER}</p>}
            </div>
        )
    }
}


// export const ObjectDetailBidListStore = connect(
//     (state) => ({
//         detailledObject: detailledObjectSelector(state),
//         bids: detailledObjectBidSelector(state)
//     }),
//     (dispatch) => ({
//         fetchBidsOfObject: (objectId) => dispatch(fetchBidsOfObject(objectId))
//     })
// )(ObjectDetailBidList)
    
    ObjectDetailBidList.propType = {
        detailledObject: PropTypes.object.isRequired,
        bids: PropTypes.object.isRequired,
    
        // fetchBidsOfObject: PropTypes.func.isRequired,
    }

export default ObjectDetailBidList
