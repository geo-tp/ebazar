import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { subCategorySelector } from "../selectors/SubCategorySelectors";
import {fetchSubCategories} from "../thunks/SubCategoryThunk"
import { fetchObjects } from "../thunks/ObjectThunk";

class SubCategoryBanner extends Component {

    constructor(props) {
        super(props)
        this.props.fetchSubCategories(this.props.categoryId)
    }

    render() {
        return(
            <div className="main-sub-category">
                <h4>Sous catégories</h4>
                <div className="main-sub-category__container">
                    {this.props.subCategories.loaded && this.props.subCategories.items.map(subcat => {
                        return(          
                             <div className="main-sub-category__container__button-box">
                                <button onClick={() => this.props.fetchObjects({filter_field:"subcategory", 
                                                                                filter_value: subcat.id})}
                                    className="main-sub-category__container__button-box__button">{subcat.title}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


// const SubCategoryBannerStore = connect(
//     (state) => ({
//         subCategories: subCategorySelector(state)
//     }),
//     (dispatch) => ({
//         fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
//         fetchObjects: (filter) => dispatch(fetchObjects(filter)),
//     })
// )(SubCategoryBanner)

SubCategoryBanner.propTypes = {
    
    categoryId: PropTypes.string.isRequired,

    subCategories: PropTypes.object.isRequired,
    fetchSubCategories: PropTypes.func.isRequired,
    fetchObjects: PropTypes.func.isRequired
}



export default SubCategoryBanner