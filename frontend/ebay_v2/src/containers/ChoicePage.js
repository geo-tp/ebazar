import { Component } from "react";
import PropTypes from "prop-types";
import { fetchObjects } from "../thunks/ObjectThunk";
import { connect } from "react-redux";
import ObjectList from "../components/ObjectList";
import { biddedObjectSelector, followedObjectSelector, objectSelector } from "../selectors/ObjectSelectors";
import { withRouter } from "react-router";
import { PAGE_CHOICE_QUERY, PAGE_CHOICE_TITLE } from "../utils/pageChoice";
import { fetchFollowedObjects } from "../thunks/FollowedObjectThunk";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchBiddedObjects } from "../thunks/BiddedObjectThunk";
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

        if(prevProps.match.params.choice !== this.props.match.params.choice){
            
            this.fetchObjectsChoice()
            window.scrollTo(0,0)
        }
      }

    async fetchObjectsChoice() {
        
        switch (this.props.match.params.choice) {
            case "bidded":
                await this.props.fetchBiddedObjects(this.props.auth.basicUser.id)
                this.setState({objects:this.props.biddedObjects})
                break;
            
            case "followed":
                await this.props.fetchFollowedObjects(this.props.auth.basicUser.id)
                this.setState({objects:this.props.followedObjects})
                break;
    
            default:
                let filter = PAGE_CHOICE_QUERY[this.props.match.params.choice]
                this.props.fetchObjects(filter)
                this.setState({objects:this.props.objects})
                break;
        }

    }
     


    render() {
        console.log(this.state.objects)
        return( 
            <div className="main-choice-page">
                { this.state.objects ?
                    <ObjectList listLabel={PAGE_CHOICE_TITLE[this.props.match.params.choice]}
                                objects={this.state.objects}
                                fetchNextObjectsPage={this.props.fetchNextObjectsPage}/>
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
    fetchFollowedObjects:PropTypes.func.isRequired


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
    })
)(Choice)

export default withRouter(ChoicePage)