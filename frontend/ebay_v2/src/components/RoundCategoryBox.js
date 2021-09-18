
import { Component } from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

class RoundCategorieBox extends Component {

    render() {
        return(
            <div className="round-category-box">
                <Link to={"/category/"+this.props.category.id}>
                        <img className="round-category-box__image" 
                             src={this.props.category.img}></img>
               </Link>
            </div>
        )
    }
}

RoundCategorieBox.propTypes = {
    category: PropTypes.object.isRequired
}

export default RoundCategorieBox