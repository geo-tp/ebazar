import { Component } from "react";
import PropTypes from 'prop-types'

class UserMessageForm extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            message:"",
            error: "",
        })
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
    viewedUserId: PropTypes.number.isRequired
}

export default UserMessageForm