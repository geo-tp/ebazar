import { Component } from "react";
import PropTypes from 'prop-types'
import { fetchObjects } from "../thunks/ObjectThunk";
import {fetchDetailledObject} from "../thunks/DetailledObjectThunk"
import { connect } from "react-redux";
import { detailledObjectBidSelector, detailledObjectImageSelector, 
         detailledObjectQuestionSelector, detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { fetchQuestionsOfObject } from "../thunks/QuestionThunk";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import { objectSelector } from "../selectors/ObjectSelectors";
import ObjectDetailStore from "../components/ObjectDetail";
import ObjectListStore from "../components/ObjectList";
import ObjectDetail from "../components/ObjectDetail";
import { fetchImagesOfObject } from "../thunks/ImageThunk";
import { withRouter } from "react-router";

class Detail extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div>
                <ObjectDetailStore detailledObjectId={this.props.match.params.objectId}/>
                <h3>Recommandés pour vous</h3>
                <ObjectListStore/>
            </div>
        )
    }
}

const DetailStore = connect(
    (state) => ({
        objects: objectSelector(state),
        
        detailledObject: detailledObjectSelector(state),
        detailledObjectQuestions: detailledObjectQuestionSelector(state),
        detailledObjectBids: detailledObjectBidSelector(state),
        detailledObjectImages: detailledObjectImageSelector(state)

    }),
    (dispatch) => ({

        fetchObjects : (filter) => fetchObjects(filter),
        fetchDetailledObject: (objectId) => dispatch(fetchDetailledObject(objectId)),

    })
)(Detail)

Detail.propTypes = {

    objects: PropTypes.object.isRequired,

    detailledObject: PropTypes.object.isRequired,
    detailledObjectQuestions: PropTypes.object.isRequired,
    detailledObjectImages: PropTypes.object.isRequired,
    detailledObjectBids: PropTypes.object.isRequired,

    fetchObjects: PropTypes.func.isRequired,
    fetchDetailledObjects: PropTypes.func.isRequired,
}

export default withRouter(DetailStore)

