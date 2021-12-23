import { Component } from "react";
import PropTypes from 'prop-types'
import { fetchCreateMessage } from "../fetch/CreateMessageFetch";

class UserMessageForm extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            message:"",
            error: "",
        })
    }

    handleMessageSubmit = async (e) => {
        e.preventDefault()
        console.log("CEST OK")
        let response = await fetchCreateMessage(this.props.auth.basicUser.id,this.props.viewedUser.id, this.state.title, this.state.message)
        console.log(response)
        this.setState({error: "Message envoyé"})
    }

    render() {
        return(
            <div className="main-user-message">
                    <form onSubmit={(e) => this.handleMessageSubmit(e)}>
                        <table>
                            <tr>
                                <td><label> Titre </label></td>
                                <td><input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} type="text" required/></td>
                            </tr>
                            <tr>
                                <td><label> Message</label></td>
                                <td> <textarea required value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} required></textarea></td>
                            </tr>
                            <tr>
                                <td colspan="2"><input type="submit" value="Envoyer"/></td>
                            </tr>
                        </table>
                        <p>{this.state.error}</p>
                    </form>         
            </div>
        )
    }
}


UserMessageForm.propTypes = {
    viewedUser: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default UserMessageForm