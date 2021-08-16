import { Component } from "react";
import PropTypes from "prop-types"

class SelledSelectionButton extends Component {

    constructor(props) {
        super(props)
    }

    handleClick = (index) => {
        this.props.handleCatChange(index)
    }

    render() {

        return(
            <div>
                <div className="main-selection-button">
                    <div className={this.props.selected == 1 ?
                                            "main-selection-button__selected"
                                            :
                                            "main-selection-button_unselected"}>
                        <button onClick={() => this.handleClick(1)}>
                            A Envoyer<span className="main-selection-button__paid-number"></span>
                            <p><i className="fa fa-2x fa-paper-plane"/></p>
                        </button>
                    </div>
                    <div className={this.props.selected == 2 ?
                                            "main-selection-button__selected"
                                            :
                                            "main-selection-button_unselected"}>
                        <button onClick={() => this.handleClick(2)}>
                            En Cours
                            <p><i className="fa fa-2x fa-shopping-cart"/></p>
                        </button>
                    </div>
                    <div className={this.props.selected == 3 ?
                                            "main-selection-button__selected"
                                            :
                                            "main-selection-button_unselected"}>
                        <button onClick={() => this.handleClick(3)}>
                            Finalisées
                            <p><i className="fa fa-2x fa-arrow-circle-down"/></p>
                        </button>
                    </div>
                    <div className={this.props.selected == 4 ?
                                            "main-selection-button__selected"                       
                                            :
                                            "main-selection-button_unselected"}>
                        
                        <button onClick={() => this.handleClick(4)}>
                            Tout
                            <p><i className="fa fa-2x fa-th-list"/></p>
                        </button>
                    </div>            
                </div>
            </div>
        )
    }
}


SelledSelectionButton.propTypes = {
    handleCatChange: PropTypes.func.isRequired
}

export default SelledSelectionButton