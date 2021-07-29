import { Component } from "react"

class MessageResponse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sujet: "",
            message: "",

            data_is_missing: null
        }
    }

    sendData = (e) => {

        e.preventDefault()

        console.log("MESS", this.state.message)
        if (this.state.message === "") {
            this.setState({data_is_missing: "Veuillez remplir le formulaire"})
            return
        }

        this.props.requestSendData(this.state.sujet, this.state.message)

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
                                        placeholder="Sujet">
                                    </input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <textarea 
                                        value={this.state.message}
                                        placeholder='Votre message'
                                        onChange={(e) => this.setState({message:e.target.value})}>
                                    </textarea>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <button onClick={(e) => this.sendData(e)}>Envoyer</button>
                                    <p>{this.state.data_is_missing}</p>
                                    <p>{this.props.confirmation_data_send}</p>
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