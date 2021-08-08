import { Component } from "react";
import { Redirect } from "react-router";
import ObjectForm from "../components/ObjectForm";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { fetchEditObject } from "../thunks/ObjectThunk";
import { userSelector } from "../selectors/UserSelectors";
import { fetchSubCategories } from "../thunks/SubCategoryThunk";
import { fetchCategories } from "../thunks/CategoryThunk";
import { categorySelector } from "../selectors/CategorySelectors";
import { subCategorySelector } from "../selectors/SubCategorySelectors";
import { durationSelector } from "../selectors/DurationSelectors";
import { fetchDurations } from "../thunks/DurationThunk";
import { stateSelector } from "../selectors/StateSelectors";
import {fetchStates} from "../thunks/StateThunk";


class Sell extends Component {

    constructor(props) {
        super(props)

        if (!this.props.categories.loaded) {
            this.props.fetchCategories()
        }

        if (!this.props.durations.loaded) {
            this.props.fetchDurations()
        }

        if (!this.props.states.loaded) {
            this.props.fetchStates()
        }

    }

    render() {
        if (this.props.user == null) {
            return <Redirect to="/auth"/>
        }

        return(

            <div>
                <ObjectForm user={{id:3}}
                            categories={this.props.categories}
                            subcategories={this.props.subCategories}
                            durations={this.props.durations}
                            states={this.props.states}
                            fetchSubCategories={this.props.fetchSubCategories}/>
            </div>
        )
    }
}

Sell.propTypes = {
    user: PropTypes.object.isRequired,


 }


export const SellPage = connect(
    (state) => ({
        user: userSelector(state),
        categories: categorySelector(state),
        subCategories: subCategorySelector(state),
        durations: durationSelector(state),
        states: stateSelector(state),
    }),
    (dispatch) => ({
        fetchEditObject: (objectId) => dispatch(fetchEditObject(objectId)),
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchDurations: () => dispatch(fetchDurations()),
        fetchStates: () => dispatch(fetchStates())
    }),
)(Sell)

export default SellPage