import { Component } from "react";
import PropTypes from "prop-types"
import { categorySelector } from "../selectors/CategorySelectors";
import { fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
import { fetchCategories } from "../thunks/CategoryThunk";
import SearchForm from "../components/SearchForm";
import { connect } from "react-redux";
import ObjectListContainer from "./ObjectListContainer";
import { objectSelector } from "../selectors/ObjectSelectors";
import { withRouter } from "react-router";


class Search extends Component {

    constructor(props) {
        super(props)

        if (!this.props.categories.loaded) {

            this.props.fetchCategories()
        }

        if (!this.props.match.params.query) {
            this.props.fetchObjects()

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return(
            <div className="main-search-page">
                <SearchForm categories={this.props.categories}
                            fetchObjects={this.props.fetchObjects}
                            query={this.props.match.params.query ? this.props.match.params.query : null }/>

                <ObjectListContainer />
            </div>
        )
    }
}

Search.propTypes = {

}

const SearchPage = connect (
    (state) => ({
        categories: categorySelector(state),
        objects: objectSelector(state),
    }),
    (dispatch) => ({
        fetchObjects: (filter) => dispatch(fetchObjects(filter)),
        fetchNextObjectsPage : (url) => dispatch(fetchNextObjectsPage(url)),
        fetchCategories: () => dispatch(fetchCategories())
    })
)(Search)

export default withRouter(SearchPage)