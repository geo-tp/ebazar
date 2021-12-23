import { Component } from "react"
import { fetchCreateMessage } from "../fetch/CreateMessageFetch"
import { fetchCreateQuestion } from "../fetch/CreateQuestionFetch"
import { FILL_FORM } from "../utils/errors"
import { MESSAGE_SENDED_SUCCESS } from "../utils/success"
import PropTypes from "prop-types"


class MessageResponse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sujet: "",
            message: "",
            

            data_is_missing: null
        }
    }

    sendData = async (e) => {

        e.preventDefault()

        if (this.state.message === "") {
            this.setState({data_is_missing: FILL_FORM})
            return
        }

        let response
        if (this.props.datainViewType == "questions") {
            response = await fetchCreateQuestion(this.props.user.item.id,
                                                     this.props.message.sender.id,
                                                     this.state.message,
                                                     this.props.message.obj.id)
        }

        else {
            response = await fetchCreateMessage(this.props.user.item.id, 
                                                    this.props.message.sender.id,
                                                    this.state.title,
                                                    this.state.message)

        }


        if (response) {
            this.setState({confirmation_data_send: MESSAGE_SENDED_SUCCESS})
        }

        else {

        }
        
        console.log(response)
        this.setState({
            sujet: "",
            message: ""
        })


    }

    render() {
        return(
            <div className="main-message-response">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td><input
                                        value={this.state.sujet}
                                        onChange={(e) => this.setState({sujet:e.target.value})} 
                                        placeholder="Sujet de votre réponse">
                                    </input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <textarea 
                                        value={this.state.message}
                                        placeholder='Votre réponse'
                                        onChange={(e) => this.setState({message:e.target.value})}>
                                    </textarea>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <button onClick={(e) => this.sendData(e)}>Envoyer</button>
                                    <p>{this.state.data_is_missing}</p>
                                    <p>{this.state.confirmation_data_send}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default MessageResponse



MessageResponse.propTypes = {

    user: PropTypes.object.isRequired,
    datainViewType: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired
}
