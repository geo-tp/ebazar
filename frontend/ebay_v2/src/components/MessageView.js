import { Component } from "react";

class MessageView extends Component {

    render() {

        if (this.props.message && this.props.message.hasOwnProperty("questionText")) {
            return null
        }

        return(
            <div className="main-message-view">
                <div className="top-view">
                    <p className="message-view-user-date">
                        {this.props.message && <span> 
                                                {this.props.message.sender.username && this.props.message.sender.username} le {this.props.message.date.split("T")[0]}
                                                <button className='delete-message-button fa fa-trash'></button>
                                                </span>}
                                
                    </p>
                </div>
                <h4 className="message-view-title">{this.props.message && this.props.message.title}</h4>
                <p className="message-view-text">{this.props.message ? this.props.message.text : <span>Aucune activité pour le moment</span>}</p>
            </div>
        )
    }
}

export default MessageView