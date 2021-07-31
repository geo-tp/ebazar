import { Component } from "react";


class Questions extends Component {

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
            <div className='work__wrapper wrapper--large'>
                    <div className="question-send-input">
                        <p><input  onChange={e => this.setState({questionText:e.target.value})} value={this.state.questionText} placeholder="Poser votre question"/></p>
                        <button onClick={e => this.handleQuestionClick(e)}>Envoyer</button>
                        <p>{this.state.error}</p>
                    </div>
                <div className="questions-main">
                {this.props.questions.map((question) => {
                    return (
                        <div className="question-object-box">
                            <p className="question-object-label">Question</p>
                            <p className="question-object-question"><strong>{question.question}</strong></p>
                            <p className="question-object-response-label">Réponse</p>
                            <p className="question-object-answer">{question.answer}</p>
                        </div>                        
                    )
                })}
                </div>
                {this.props.questions.length == 0 && <p>Aucune question pour le moment</p>}
            </div>
        )
    }
}

export default Questions

