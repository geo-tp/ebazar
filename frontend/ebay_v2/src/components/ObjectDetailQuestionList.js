import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { questionOfObjectSelector, questionSelector } from "../selectors/QuestionSelectors";
import { fetchNextQuestionsOfObjectPage, fetchQuestionsOfObject } from "../thunks/QuestionThunk";
import { detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { FILL_FORM, NO_QUESTION_ERROR } from "../utils/errors";
import { fetchCreateQuestion } from "../fetch/CreateQuestionFetch";
import { MESSAGE_SENDED_SUCCESS } from "../utils/success";


class ObjectDetailQuestionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questionText: "",
            error: ""
        }

    }

    handleCreateQuestionClick = async () => {

        if (this.state.questionText == "") {
            this.setState({error: FILL_FORM})
            return
        }

        let response = await fetchCreateQuestion(this.props.auth.basicUser.id,
                                                 this.props.detailledObject.userId,
                                                 this.props.questionText,
                                                 this.props.detailledObject.id)

        if (response) {
            this.setState({error: MESSAGE_SENDED_SUCCESS,
                           questionText: ""})
        }

    }

    render() {
        return(
            <div className='wrapper'>

                <div className="main-detailled-object-questions">

                    <h4>QUESTIONS SUR L'OBJET</h4>
                    {this.props.auth.connected &&
                        <div className="main-detailled-object-questions__question-form">
                            <p><input  onChange={e => this.setState({questionText:e.target.value})} value={this.state.questionText} placeholder="Poser votre question"/></p>
                            <button onClick={e => this.handleCreateQuestionClick(e)}>Envoyer</button>
                            <p>{this.state.error}</p>
                        </div>
                    }
                    <div className="main-detailled-object-questions__box">
                    {this.props.questions.loaded && this.props.questions.items.results.map((question) => {
                        return (
                            <div className="main-detailled-object-questions__box__q-and-a">
                                <p className="main-detailled-object-questions__box__q-and-a__question-label">Question</p>
                                <p className="main-detailled-object-questions__box__q-and-a__question"><strong>{question.questionText}</strong></p>
                                <p className="main-detailled-object-questions__box__q-and-a__answer-label">Réponse</p>
                                <p className="main-detailled-object-questions__box__q-and-a__answer">{question.answerText}</p>
                            </div>                        
                        )
                    })}
                    </div>
                    {this.props.questions.loaded && this.props.questions.items.next &&
                        <button onClick={ () => this.props.fetchNextQuestionsOfObjectPage(
                                                            this.props.questions.items.next
                                                            )
                                        } 
                                className="">
                                Voir plus
                        </button>
                    }
                    {this.props.questions.loaded && this.props.questions.items.results.length == 0 && 
                                    <p>{NO_QUESTION_ERROR}</p>}
                </div>
            </div>
        )
    }
}

ObjectDetailQuestionList.propType = {
    detailledObject:PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,

    fetchQuestionsOfObject: PropTypes.func.isRequired,
}

export default ObjectDetailQuestionList

