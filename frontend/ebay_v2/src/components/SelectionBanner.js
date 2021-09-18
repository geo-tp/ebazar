import { Component } from "react";
import {fetchSelections} from "../thunks/SelectionThunk"
import {selectionSelector} from "../selectors/SelectionSelectors"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import RoundSelectionBox from "./RoundSelectionBox";


class SelectionBanner extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div className="main-selection-banner">
                <div>
                    <h4>Notre selection du moment</h4>
                    <div className="main-selection-banner__container">
                        {this.props.selections.loaded && 
                            
                            this.props.selections.items.map((object, index) => {
                                return(
                                    <RoundSelectionBox object={object}/>
                                )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

SelectionBanner.propTypes = {
    selections: PropTypes.object.isRequired,
}

export default SelectionBanner