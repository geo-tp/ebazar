
import { Component } from "react";
// import "./style.css"
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

export default RoundCategorieBox