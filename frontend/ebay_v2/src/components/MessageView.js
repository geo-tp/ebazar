import { Component } from "react";
import { NO_SELECTION_ERROR } from "../utils/errors";
import PropTypes from "prop-types"

class MessageView extends Component {

    render() {

        return(
            <div className="main-message-view">
                <div className="main-message-view__top-view">
                    <p className="main-message-view__top-view__user-date">
                        {this.props.message && 
                                <span> 
                                    {this.props.message.sender.username && 
                                            this.props.message.sender.username} le {this.props.message.date.split("T")[0]}
                                    <button className='delete-message-button fa fa-trash'></button>
                                </span>}        
                    </p>
                </div>
                <h4 className="main-message-view__top-view__title">
                    {this.props.message && this.props.message.title}</h4>
                <p className="main-message-view__top-view__text">
                    {this.props.message ? 
                            this.props.message.text : 
                            <span>{NO_SELECTION_ERROR}</span>}
                </p>
            </div>
        )
    }
}

MessageView.propTypes = {
    message: PropTypes.object.isRequired
}

export default MessageView