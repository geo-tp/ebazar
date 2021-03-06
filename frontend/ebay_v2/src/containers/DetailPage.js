import { Component } from "react";
import PropTypes from 'prop-types'
import { fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
import {fetchDetailledObject} from "../thunks/DetailledObjectThunk"
import { connect } from "react-redux";
import { detailledObjectBidSelector, detailledObjectImageSelector, 
         detailledObjectQuestionSelector, detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { fetchQuestionsOfObject } from "../thunks/QuestionThunk";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import { objectSelector } from "../selectors/ObjectSelectors";
import ObjectList from "../components/ObjectList";
import ObjectDetail from "../components/ObjectDetail";
import { fetchImagesOfObject } from "../thunks/ImageThunk";
import { withRouter } from "react-router";
import Loading from "../components/Loading";
import { RECOMMANDED } from "../utils/listLabels";
import { authSelector } from "../selectors/AuthSelectors";

class Detail extends Component {

    constructor(props) {
        super(props)
        props.fetchObjects()

        props.fetchDetailledObject(this.props.match.params.objectId)
        props.fetchQuestionsOfObject(this.props.match.params.objectId)
        props.fetchImagesOfObject(this.props.match.params.objectId)
        props.fetchBidsOfObject(this.props.match.params.objectId)

    }


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {

        if(prevProps.match.params.objectId !== this.props.match.params.objectId){
            this.props.fetchDetailledObject(this.props.match.params.objectId)
            this.props.fetchQuestionsOfObject(this.props.match.params.objectId)
            this.props.fetchImagesOfObject(this.props.match.params.objectId)
            this.props.fetchBidsOfObject(this.props.match.params.objectId)
            
            window.scrollTo(0,0)
        }
      }
     

    render() {
        return(
            <div>
                {this.props.detailledObject.loaded && this.props.detailledObjectImages.loaded && 
                 this.props.detailledObjectQuestions.loaded && this.props.detailledObjectBids.loaded &&
                 !this.props.detailledObject.loading ?

                <ObjectDetail   auth={this.props.auth}
                                detailledObject={this.props.detailledObject}
                                detailledObjectBids={this.props.detailledObjectBids}
                                detailledObjectQuestions={this.props.detailledObjectQuestions}
                                detailledObjectImages={
                                    {...this.props.detailledObjectImages, 
                                    items: [{imageOfObject: this.props.detailledObject.item.mainImage},
                                                ...this.props.detailledObjectImages.items]} }
                                fetchDetailledObject={this.props.fetchDetailledObject}
                                fetchBidsOfObject={this.props.fetchBidsOfObject}/>
                :                           
                
                <Loading/>
                }                   
                

                <ObjectList objects={this.props.objects} 
                            listLabel={RECOMMANDED}
                            fetchNextObjectsPage={this.props.fetchNextObjectsPage}/>
            </div>
        )
    }
}

const DetailPage = connect(
    (state) => ({
        objects: objectSelector(state),
        auth: authSelector(state),
        
        detailledObject: detailledObjectSelector(state),
        detailledObjectQuestions: detailledObjectQuestionSelector(state),
        detailledObjectBids: detailledObjectBidSelector(state),
        detailledObjectImages: detailledObjectImageSelector(state)

    }),
    (dispatch) => ({

        fetchObjects : (filter) => dispatch(fetchObjects(filter)),
        fetchNextObjectsPage: (url) => dispatch(fetchNextObjectsPage(url)),
        fetchDetailledObject: (objectId) => dispatch(fetchDetailledObject(objectId)),
        fetchBidsOfObject: (objectId) => dispatch(fetchBidsOfObject(objectId)),
        fetchQuestionsOfObject: (objectId) => dispatch(fetchQuestionsOfObject(objectId)),
        fetchImagesOfObject: (objectId) => dispatch(fetchImagesOfObject(objectId))

    })
)(Detail)

Detail.propTypes = {

    objects: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,

    detailledObject: PropTypes.object.isRequired,
    detailledObjectQuestions: PropTypes.object.isRequired,
    detailledObjectImages: PropTypes.object.isRequired,
    detailledObjectBids: PropTypes.object.isRequired,

    fetchObjects: PropTypes.func.isRequired,
    fetchDetailledObjects: PropTypes.func.isRequired,
    fetchBidsOfObject: PropTypes.func.isRequired,
    fetchQuestionsOfObject: PropTypes.func.isRequired
}

export default withRouter(DetailPage)

