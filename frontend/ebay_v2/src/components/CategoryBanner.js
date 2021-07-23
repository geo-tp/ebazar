import { Component } from "react";
import {request_formatter} from "../../../GLOBAL";
import RoundCategorieBox from "./Components/RoundCategorieBox"
import './style.css'
import {withRouter} from "react-router-dom"
import Loading from "../Loading/Loading";
import PropTypes from "prop-types"
import {categorySelector} from "../selectors/CategorySelector"
import {fetchCategories} from "../thunks/CategoryThunk"

class CategoryBanner extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         queryset: null,
    //     }

    //     this.requestQuerySet()
    // }
    
    // componentDidMount() {
        
    // }

    // requestQuerySet = () => {
        
    //     let url = request_formatter({
    //             model: "category"
    //         })


    //     fetch(url)
    //         .then(res => res.json())
    //         .then(json => this.setState({queryset : json}))
    // }
    

    render() {
        return(
            <div>
                <h4>Catégories</h4>
                <div class="main-categories">
                    {this.props.loaded && this.props.items.map(category => {
                        return <RoundCategorieBox category={category}/>
                    })}
                    {!this.props.loaded && <Loading/>}
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
        fetchCategories: () => fetchCategories()
    })
)

CategoryBanner.propTypes = {

    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired
 }

export default CategoryBanner