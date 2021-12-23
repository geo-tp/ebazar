import { Component } from "react";
import { NO_SELECTION_ERROR } from "../utils/errors";
import PropTypes from 'prop-types'

class QuestionView extends Component {

    render() {

        if (this.props.question && this.props.question.hasOwnProperty("title")) {
            return null
        }

        return(
            <div className="main-question-view">
                <p className="main-question-view__question-box__text">
                    {this.props.question ? null : <span>{NO_SELECTION_ERROR}</span>}
                </p>
                <div className="main-question-view__top-view">
                    <p className="main-question-view__top-view__user-date">
                        {this.props.question && <span>
                                                    {this.props.question && this.props.question.sender_username} le {this.props.question.date.split("T")[0]}
                                                    <button className='delete-message-button fa fa-trash'></button>
                                                </span>}
                    </p>
                </div>
                <div className="main-question-view__question-box">
                    {this.props.question && <img class="main-question-view__question-box__img" 
                                                 src={this.props.question.obj.mainImage}/>}

                    <h4 className="main-question-view__question-box__title">{this.props.question && 
                                                           this.props.question.questionText}</h4>
                </div>
            </div>
        )
    }
}

QuestionView.propTypes = {
    question : PropTypes.object.isRequired
}

export default QuestionView