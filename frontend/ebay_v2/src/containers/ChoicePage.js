import { Component } from "react";
import PropTypes from "prop-types";
import { fetchObjects } from "../thunks/ObjectThunk";
import { connect } from "react-redux";
import ObjectListContainer from "./ObjectListContainer";
import { objectSelector } from "../selectors/ObjectSelectors";
import { withRouter } from "react-router";
import { PAGE_CHOICE_QUERY, PAGE_CHOICE_TITLE } from "../utils/pageChoice";

class Choice extends Component {

    constructor(props) {
        super(props)
        this.fetchObjectsChoice()
    }

    componentDidUpdate(prevProps) {

        if(prevProps.match.params.choice !== this.props.match.params.choice){
            
            this.fetchObjectsChoice()
            window.scrollTo(0,0)
        }
      }

    fetchObjectsChoice() {

        let filter = PAGE_CHOICE_QUERY[this.props.match.params.choice]
        this.props.fetchObjects(filter)
    }
     


    render() {

        return( 
            <div className="main-choice-page">
                <h3>{PAGE_CHOICE_TITLE[this.props.match.params.choice]}</h3>
                <ObjectListContainer/>
            </div>
        )
    }
}


Choice.propTypes = {

    choice: PropTypes.string.isRequired,

    objects: PropTypes.object.isRequired,
    fetchObjects: PropTypes.func.isRequired,


}

const ChoicePage = connect (
    (state) => ({
        objects: objectSelector(state),
    }),
    (dispatch) => ({
        fetchObjects: (filter) => dispatch(fetchObjects(filter)),
    })
)(Choice)

export default withRouter(ChoicePage)