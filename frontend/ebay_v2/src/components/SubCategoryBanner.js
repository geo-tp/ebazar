import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { SubCategorySelector } from "../selectors/SubCategorySelector";
import {fetchSubCategories} from "../thunks/SubCategoryThunk"

class SubCategoryBanner extends Component {


    render() {
        return(
            <div>
                <h4>Sous catégories</h4>
                <div class="main-sub-category">
                    {this.props.subCategories.loaded && this.state.queryset.map(subcat => {
                        return(          
                             <div className="main-sub-category__button-box">
                                <button>{subcat.title}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


const BanniereSelectionStore = connect(
    (state) => ({
        subCategories: subCategorySelector(state)
    }),
    (dispatch) => ({
        fetchSubCategories: () => dispatch(fetchSubCategories())
    })
)(SubCategoryBanner)

SubCategoryBanner.propTypes = {
    subCategories: PropTypes.object.isRequired,
    fetchSubCategories: PropTypes.func.isRequired
}



export default BanniereSelectionStore