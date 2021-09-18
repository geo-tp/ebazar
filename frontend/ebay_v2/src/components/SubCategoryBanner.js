import { Component } from "react";
import PropTypes from "prop-types"

class SubCategoryBanner extends Component {

    constructor(props) {
        super(props)
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


SubCategoryBanner.propTypes = {
    
    subCategories: PropTypes.object.isRequired,
    fetchObjects: PropTypes.func.isRequired,
}



export default SubCategoryBanner