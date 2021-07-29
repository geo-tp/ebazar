import { Component } from "react";

class QuestionView extends Component {

    render() {

        if (this.props.question && this.props.question.hasOwnProperty("title")) {
            return null
        }

        return(
            <div className="main-message-view">
                <div className="top-view">
                    <p className="message-view-user-date">
                        {this.props.question && <span>
                                                    {this.props.question && this.props.question.user.username} le {this.props.question.date.split("T")[0]}
                                                    <button className='delete-message-button fa fa-trash'></button>
                                                </span>}
                    </p>
                </div>
                <div className="question-box">
                    {this.props.question && <img class="question-view-img" src={this.props.question.obj.mainImage}/>}
                    <h4 className="message-view-title">{this.props.question && this.props.question.questionText}</h4>
                </div>
                <p className="message-view-text">{this.props.question ? null : <span>Bienvenue dans la messagerie</span>}</p>
            </div>
        )
    }
}

export default QuestionView