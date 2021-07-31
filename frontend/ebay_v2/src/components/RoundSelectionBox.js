
import { Component } from "react";

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

export default RoundSelectionBox