import { Component } from "react";
import { convertDateToDuration } from "../utils/timeConverters";

class MessagesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected ? this.props.selected : 1
        }        
    }

    handleClick = (set, index_selected) => {
        this.props.handleDataChange(set)
        this.setState({selected: index_selected})
    }

    render() {
        let classViewed = ["unviewed_message", "viewed_message"]
        return(
            <div className="main-table-messages">
                <div className="button-box">
                    <div className="message-table-questions-button">
                        <button onClick={() => this.handleClick("questions_set", 1)}
                                className="fa fa-2x fa-question" id={this.state.selected == 1 && "selected-table-index"}></button>
                    </div>
                    <button onClick={() => this.handleClick("messages_set", 2)}
                            className="fa fa-2x fa-envelope" id={this.state.selected == 2 && "selected-table-index"}></button>

                    <button onClick={() => this.handleClick("sended_messages_set", 3)}
                            className="fa fa-2x fa-paper-plane" id={this.state.selected == 3 && "selected-table-index"}></button>
                </div>
                <div className="table-box">
                    <table>
                        <thead>
                                    <th>Sujet</th>
                                    <th>Nom</th>
                                    <th>Date</th>
                        </thead>
                        <tbody>
                            {this.props.type == "messages_set" &&
                            this.props.data.map((message, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selected_data_index ? "table-selected-row" : message.viewed ? "table-row" : "table-row unviewed-row"} 
                                        onClick={() => this.props.handleDataInViewChange(message.id, table_index)}>
                                        <td>{message.title}</td>
                                        <td>{message.sender.username}</td>
                                        <td>{convertDateToDuration(message.date)}</td>
                                    </tr>
                                )
                            })}

                            {!this.props.data.length &&
                                <p style={{"text-align": "center"}}>Rien pour le moment</p>
                            }
                            {this.props.type == "questions_set"  &&
                            this.props.data.map((question, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selected_data_index ? "table-selected-row" : question.viewed ? "table-row" : "table-row unviewed-row"} 
                                        onClick={() => this.props.handleDataInViewChange(question.id, table_index)}>
                                        <td>{question.questionText}</td>
                                        <td>{question.obj.title}</td>
                                        <td>{convertDateToDuration(question.date)}</td>
                                    </tr>
                                )
                            })}

                            {this.props.type == "sended_messages_set" &&
                            this.props.data.map((message, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selected_data_index ? "table-selected-row" : "table-row"} 
                                        onClick={() => this.props.handleDataInViewChange(message.id, table_index)}>
                                        <td>{message.title}</td>
                                        <td>{message.reciever.username}</td>
                                        <td>{convertDateToDuration(message.date)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MessagesTable
