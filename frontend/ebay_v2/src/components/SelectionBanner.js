import { Component } from "react";
import {fetchSelections} from "../thunks/SelectionThunk"
import {selectionSelector} from "../selectors/SelectionSelector"
import PropTypes from "prop-types"


class SelectionBanner extends Component {

    render() {
        return(
            <div className="main-selection-banner">
                <div>
                    <h4>Notre selection du moment</h4>
                    <div className="main-selection-banner__caroussel">
                        {this.state.selections && 
                            
                            this.props.selections.items.map((object, index) => {
                                return(
                                    <div className="main-selection-banner__caroussel__container">
                                        <img className="main-selection-banner__caroussel__container__image" src={object.img} />
                                        <p className="main-selection-banner__caroussel__container__title">{object.title}</p>
                                    </div>
                                )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const SelectionBannerStore = connect(
    (state) => ({
        selections: selectionSelector(state)
    }),

    (dispatch) => ({
        fetchSelections: () => dispatch(fetchSelections())
    })
)

SelectionBanner.propTypes = {
    selections: PropTypes.object.isRequired,
    fetchSelections: PropTypes.func.isRequired
}

export default SelectionBannerStore