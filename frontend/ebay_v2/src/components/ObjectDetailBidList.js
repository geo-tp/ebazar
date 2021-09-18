import { Component } from "react";
import PropTypes from "prop-types"
import { NO_OBJECT_TO_RENDER } from "../utils/errors";


class ObjectDetailBidList extends Component {

    render() {
        return(
            
            <div className="bid-list">

                    <table>
                        <tbody>
                {this.props.bids.loaded && this.props.bids.items.results.map((bid) => {
                    return(
                                <tr>
                                    <td>{bid.user}</td>
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
