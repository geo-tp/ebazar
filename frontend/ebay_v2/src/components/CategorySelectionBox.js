import { Component } from "react";
import PropTypes from "prop-types"
import { keyHandler } from "../utils/keyHandler";

class CategorySelectionBox extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         categories: null
    //     }
    // }

    render() {
        return(
            <div>
                <select onChange={(e) => this.props.handleChoiceChange(e)} name={this.props.categoryType} required>
                    {this.props.categoryType == "category" && <option>-</option>}
                    {this.props.categories.loaded && this.props.categories.items.map((cat) => {
                        if (cat.id == this.props.selected) {
                            return <option key={keyHandler()} selected="selected" value={cat.id}>{cat.title}</option>
                        }
                        else {
                            return <option key={keyHandler()} value={cat.id}>{cat.title}</option>
                        }
                    })}
                </select>
            </div>
        )
    }
}

CategorySelectionBox.propTypes = {
    categories: PropTypes.object.isRequired,
    handleChoiceChange: PropTypes.func.isRequired,
    categoryId: PropTypes.string,
    selected: PropTypes.object.isRequired
}

export default CategorySelectionBox