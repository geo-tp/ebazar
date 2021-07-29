import { Component } from "react";
import RoundCategorieBox from "./RoundCategoryBox"
import PropTypes from "prop-types"
import {categorySelector} from "../selectors/CategorySelectors"
import {fetchCategories} from "../thunks/CategoryThunk"
import { connect } from "react-redux";
import Loading from "./Loading";
import { keyHandler } from "../utils/keyHandler";


class CategoryBanner extends Component {
    
    componentDidMount() {
        
        this.props.fetchCategories()
    }
    
    render() {
        return(
            <div>
                <h4>Catégories</h4>
                <div className="main-categories">
                    {this.props.categories.loaded && this.props.categories.items.map(category => {
                        return <RoundCategorieBox key={keyHandler()} category={category}/>
                    })}
                    {!this.props.categories.loaded && <Loading/>}
                </div>
            </div>
        )
    }
}

const CategoryBannerStore = connect(
    (state) => ({
        categories:categorySelector(state)
    }),
    (dispatch) => ({
        fetchCategories: () => dispatch(fetchCategories())
    })
)(CategoryBanner)

CategoryBanner.propTypes = {

    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired
 }

export default CategoryBannerStore