import { Component } from "react";
import ObjectsList from "./../components/ObjectList";
import SubCategoryBannerStore from "../components/SubCategoryBanner";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { fetchCategories } from "../thunks/CategoryThunk";
import { categorySelector } from "../selectors/CategorySelectors";
import { objectSelector } from "../selectors/ObjectSelectors";
import { fetchObjects } from "../thunks/ObjectThunk";
import { withRouter } from "react-router";
import { subCategorySelector } from "../selectors/SubCategorySelectors";
import { fetchSubCategories } from "../thunks/SubCategoryThunk";

class Category extends Component {

    constructor(props) {
        super(props)

        this.props.fetchObjects({filter_field: "category", 
                                 filter_value: this.props.match.params.categoryId})

        if (!this.props.categories.loaded) {
            this.props.fetchCategories()
        }

    }

    render() {

        return(
            <div className="main-category-page">
                <h3 className="main-category-page__selected-category" >{this.props.categories.loaded && 
                        <img src={this.props.categories.items[this.props.match.params.categoryId-1].img}/>}</h3>

                <SubCategoryBannerStore categoryId={this.props.match.params.categoryId}/>
                {this.props.objects.loaded  && 
                
                    <ObjectsList listLabel="Enchères en cours"
                                  objects={this.props.objects}/>}
            </div>
        )
    }
}

const CategoryStore = connect(
    (state) => ({
        categories: categorySelector(state),
        subCategories: subCategorySelector(state),
        objects: objectSelector(state)
    }),
    (dispatch) => ({
        fetchCategories: () => dispatch(fetchCategories()),
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
        fetchObjects: (filter) => dispatch(fetchObjects(filter))
    })
)(Category)


Category.propTypes = {

    categories: PropTypes.object.isRequired,
    objects: PropTypes.object.isRequired,

    fetchCategories: PropTypes.func.isRequired,
    fetchSubCategories: PropTypes.func.isRequired,

    fetchObjects: PropTypes.func.isRequired
}


export default withRouter(CategoryStore)