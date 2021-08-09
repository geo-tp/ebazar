import { Component } from "react";
import PropTypes from "prop-types"
import { categorySelector } from "../selectors/CategorySelectors";
import { fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
import { fetchCategories } from "../thunks/CategoryThunk";
import SearchForm from "../components/SearchForm";
import { connect } from "react-redux";
import ObjectList from "../components/ObjectList";
import { objectSelector } from "../selectors/ObjectSelectors";


class Search extends Component {

    constructor(props) {
        super(props)
        this.props.fetchCategories()
        this.props.fetchObjects()
    }

    render() {

        return(
            <div className="main-search-page">
                <SearchForm categories={this.props.categories}
                            fetchObjects={this.props.fetchObjects}/>

                <ObjectList
                            objects={this.props.objects}
                            fetchNextObjectsPage={fetchNextObjectsPage}/>
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

export default SearchPage