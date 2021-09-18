
import { Component } from "react";
import PropTypes from 'prop-types'

class RoundSelectionBox extends Component {

    render() {
        return (
            <div className="round-selection-box">
                <img className="round-selection-box__image" src={this.props.object.img} />
                <p className="round-selection-box__title">{this.props.object.title}</p>
            </div>
        )
    }
}

RoundSelectionBox.propTypes = {
    object: PropTypes.object.isRequired
}

export default RoundSelectionBox