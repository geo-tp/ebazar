import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { subCategorySelector } from "../selectors/SubCategorySelectors";
import {fetchSubCategories} from "../thunks/SubCategoryThunk"

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
                                <button className="main-sub-category__container__button-box__button">{subcat.title}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


const SubCategoryBannerStore = connect(
    (state) => ({
        subCategories: subCategorySelector(state)
    }),
    (dispatch) => ({
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId))
    })
)(SubCategoryBanner)

SubCategoryBanner.propTypes = {
    
    categoryId: PropTypes.string.isRequired,

    subCategories: PropTypes.object.isRequired,
    fetchSubCategories: PropTypes.func.isRequired
}



export default SubCategoryBannerStore