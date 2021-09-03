import { Component } from "react";
import PropTypes from "prop-types";
import { fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
import { connect } from "react-redux";
import ObjectList from "../components/ObjectList";
import { biddedObjectSelector, followedObjectSelector, objectSelector } from "../selectors/ObjectSelectors";
import { withRouter } from "react-router";
import { PAGE_CHOICE_QUERY, PAGE_CHOICE_TITLE } from "../utils/pageChoice";
import { fetchFollowedObjects, fetchNextFollowedObjectsPage } from "../thunks/FollowedObjectThunk";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchBiddedObjects, fetchNextBiddedObjectsPage } from "../thunks/BiddedObjectThunk";
import Loading from "../components/Loading";

class Choice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            objects: null,
        }

        this.fetchObjectsChoice()
    }

    componentDidUpdate(prevProps) {
        console.log("STATE", this.state)
        if(prevProps.match.params.choice !== this.props.match.params.choice){
            
            this.fetchObjectsChoice()
            window.scrollTo(0,0)
        }

        // else if(this.props.objects !== this.state.objects) {
        //     this.setState({objects:this.props.objects})
        // }
      }



    async fetchObjectsChoice() {
        
        switch (this.props.match.params.choice) {
            case "bidded":
                await this.props.fetchBiddedObjects(this.props.auth.basicUser.id)
                this.setState({objects:this.props.biddedObjects, fetchNextPage:this.props.fetchNextBiddedObjectsPage})
                break;
            
            case "followed":
                await this.props.fetchFollowedObjects(this.props.auth.basicUser.id)
                this.setState({objects:this.props.followedObjects, fetchNextPage:this.props.fetchNextFollowedObjectsPage})
                break;
    
            default:
                let filter = PAGE_CHOICE_QUERY[this.props.match.params.choice]
                await this.props.fetchObjects(filter)
                this.setState({objects:this.props.objects, fetchNextPage:this.props.fetchNextObjectsPage})
                break;
        }

    }
     


    render() {
        
        return( 
            <div className="main-choice-page">
                { this.state.objects ?
                    <ObjectList listLabel={PAGE_CHOICE_TITLE[this.props.match.params.choice]}
                                objects={this.state.objects}
                                fetchNextObjectsPage={this.state.fetchNextPage}/>
                                    :
                    <Loading/>}
            </div>
        )
    }
}

Choice.propTypes = {

    choice: PropTypes.string.isRequired,

    user: PropTypes.object.isRequired,
    objects: PropTypes.object.isRequired,
    followedObjects: PropTypes.object.isRequired,
    biddedObjects: PropTypes.object.isRequired,

    fetchObjects: PropTypes.func.isRequired,
    fetchBiddedObjects:PropTypes.func.isRequired,
    fetchFollowedObjects:PropTypes.func.isRequired,

    fetchNextObjectsPage: PropTypes.func.isRequired,
    fetchNextBiddedObjectsPage:PropTypes.func.isRequired,
    fetchNextFollowedObjectsPage:PropTypes.func.isRequired,


}

const ChoicePage = connect (
    (state) => ({
        objects: objectSelector(state),
        biddedObjects: biddedObjectSelector(state),
        followedObjects: followedObjectSelector(state),
        auth: authSelector(state),
    }),
    (dispatch) => ({
        fetchObjects: (filter) => dispatch(fetchObjects(filter)),
        fetchBiddedObjects: (userId) => dispatch(fetchBiddedObjects(userId)),
        fetchFollowedObjects: (userId) => dispatch(fetchFollowedObjects(userId)),

        fetchNextObjectsPage: (filter) => dispatch(fetchNextObjectsPage(filter)),
        fetchNextBiddedObjectsPage: (url) => dispatch(fetchNextBiddedObjectsPage(url)),
        fetchNextFollowedObjectsPage: (url) => dispatch(fetchNextFollowedObjectsPage(url)),
    })
)(Choice)

export default withRouter(ChoicePage)