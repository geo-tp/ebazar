import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { questionOfObjectSelector, questionSelector } from "../selectors/QuestionSelectors";
import { fetchNextQuestionsOfObjectPage, fetchQuestionsOfObject } from "../thunks/QuestionThunk";
import { detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import { NO_QUESTION_ERROR } from "../utils/errors";


class ObjectDetailQuestionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questionText: "",
            error: ""
        }

    }

    // handleQuestionClick = (e) => {

    //     let url = request_formatter({
    //         model:"question"
    //     })

    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             'Content-Type': 'application/json',
    //             "Authorization": "token "+this.props.token
    //           },
    //           body: JSON.stringify({questionText: this.state.questionText,
    //                                 obj: this.props.object_id,
    //                                 user: this.props.user.id})
    //     })
    //         .then(rslt => rslt.json())
    //         .then(json_data => {
    //             if (json_data.hasOwnProperty("id")) {
    //                 this.setState({error: "Votre question a été envoyée",
    //                                questionText: ""})
    //             }
    //             else {
    //                 this.setState({error:"Une erreur s'est produite"})
    //             }
    //         })
    // }



    render() {
        return(
            <div className='wrapper'>

                <div className="main-detailled-object-questions">

                    <h4>QUESTIONS SUR L'OBJET</h4>
                    <div className="main-detailled-object-questions__question-form">
                        <p><input  onChange={e => this.setState({questionText:e.target.value})} value={this.state.questionText} placeholder="Poser votre question"/></p>
                        <button onClick={e => this.handleQuestionClick(e)}>Envoyer</button>
                        <p>{this.state.error}</p>
                    </div>
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
// export const ObjectDetailQuestionListStore = connect (
//     (state) => ({
//         detailledObject: detailledObjectSelector(state),
//         questions: questionOfObjectSelector(state),
//     }),
//     (dispatch) => ({
//         fetchQuestionsOfObject: (objectId) => dispatch(fetchQuestionsOfObject(objectId)),
//         fetchNextQuestionsOfObjectPage: (url) => dispatch(fetchNextQuestionsOfObjectPage(url))
//     })

// )(ObjectDetailQuestionList)

export default ObjectDetailQuestionList

