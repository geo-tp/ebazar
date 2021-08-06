import { Component } from "react";

class UserMessageForm extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            message:"",
            error: "",
        })
    }
    
    // handleMessageSubmit = (e) => {

    //     e.preventDefault()

    //     let url = request_formatter({
    //         model: "message",
    //     })

    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //           "Accept": "application/json",
    //           'Content-Type': 'application/json',
    //           'Authorization': "token "+this.props.token
    //         },
    //         body: JSON.stringify({title: this.state.title,
    //                               text: this.state.message,
    //                               sender: this.props.user.id,
    //                               reciever: this.props.profile_user.id})
    //     })
    //         .then(rslt => rslt.json())
    //         .then(json_data => {
    //             if(json_data.hasOwnProperty("id")) {
    //                 this.setState({error: "Votre message a bien été envoyé",
    //                               title: "",
    //                               message: ""})
    //             }

    //             else {
    //                 this.setState({error: "Une erreur s'est produite"})
    //             }
    //         })
    // }

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


export default UserMessageForm