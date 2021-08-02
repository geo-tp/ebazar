import { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { questionSelector } from "../selectors/QuestionSelectors";
import { fetchQuestionsOfObject } from "../thunks/QuestionThunk";
import { detailledObjectSelector } from "../selectors/DetailledObjectSelector";


class ObjectDetailQuestionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questionText: "",
            error: ""
        }

        this.props.fetchQuestionsOfObject(this.props.detailledObject.item.id)
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
            <div className='wrapper--large'>

                <div className="main-detailled-object-questions">

                    <h4>QUESTIONS SUR L'OBJET</h4>
                    <div className="main-detailled-object-question__question-form">
                        <p><input  onChange={e => this.setState({questionText:e.target.value})} value={this.state.questionText} placeholder="Poser votre question"/></p>
                        <button onClick={e => this.handleQuestionClick(e)}>Envoyer</button>
                        <p>{this.state.error}</p>
                    </div>
                    <div className="main-detailled-object-question__box">
                    {this.props.questions.loaded && this.props.questions.items.map((question) => {
                        return (
                            <div className="main-detailled-object-question__object-questions__q-and-a">
                                <p className="main-detailled-object-question__object-questions__q-and-a__question-label">Question</p>
                                <p className="main-detailled-object-question__object-questions__q-and-a__question"><strong>{question.question}</strong></p>
                                <p className="main-detailled-object-question__object-questions__q-and-a__answer-label">Réponse</p>
                                <p className="main-detailled-object-question__object-questions__q-and-a__answer">{question.answer}</p>
                            </div>                        
                        )
                    })}
                    </div>
                    {this.props.questions.items.length == 0 && <p>Aucune question pour le moment</p>}
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

export const ObjectDetailQuestionListStore = connect (
    (state) => ({
        detailledObject: detailledObjectSelector(state),
        questions: questionSelector(state)
    }),
    (dispatch) => ({
        fetchQuestionsOfObject: (objectId) => dispatch(fetchQuestionsOfObject(objectId))
    })

)(ObjectDetailQuestionList)

export default ObjectDetailQuestionListStore

