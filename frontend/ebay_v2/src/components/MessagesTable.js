import { Component } from "react";
import { NO_MESSAGE_ERROR } from "../utils/errors";
import { convertDateToDuration } from "../utils/timeConverters";
import PropTypes from 'prop-types'


class MessagesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedData: this.props.selectedData
        }        
    }

    handleClick = (set, index_selected) => {
        this.props.handleDataChange(set)
        this.setState({selectedData: index_selected})
    }

    render() {
        console.log("type", this.props.type)
        let classViewed = ["unviewed_message", "viewed_message"]
        return(
            <div className="main-table-messages">
                <div className="main-table-messages__button-box">
                        <button onClick={() => this.handleClick("questions", 1)}
                                className="fa fa-2x fa-question" 
                                id={this.state.selectedData == 1 ? "selected-table-index" : null}>
                        </button>
                    <button onClick={() => this.handleClick("receivedMessages", 2)}
                            className="fa fa-2x fa-envelope" id={this.state.selectedData == 2 ? "selected-table-index" : null}></button>

                    <button onClick={() => this.handleClick("sendedMessages", 3)}
                            className="fa fa-2x fa-paper-plane" id={this.state.selectedData == 3 ? "selected-table-index" : null}></button>
                </div>
                <div className="main-table-messages__table-box">
                    <table>
                        <thead>
                            <tr>
                                    <th>Sujet</th>
                                    <th>Nom</th>
                                    <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!this.props.data.items.count &&
                            <tr>
                                <td><p>{NO_MESSAGE_ERROR}</p></td>
                            </tr>}

                            {this.props.type == "receivedMessages" &&
                            this.props.data.items.results.map((message, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selectedIndex ? "table-selected-row" : message.viewed ? "table-row" : "table-row unviewed-row"} 
                                        onClick={() => this.props.handleDataInViewChange(message.id, table_index)}>
                                        <td>{message.title}</td>
                                        <td>{message.sender.username}</td>
                                        <td>{convertDateToDuration(message.date)}</td>
                                    </tr>
                                )
                            })}


                            {this.props.type == "questions"  &&
                            this.props.data.items.results.map((question, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selectedIndex ? 
                                            "table-selected-row" : question.viewed ? 
                                                "table-row" : "table-row unviewed-row"} 
                                        onClick={() => this.props.handleDataInViewChange(question.id, table_index)}>
                                        <td>{question.questionText}</td>
                                        <td>{question.obj.title}</td>
                                        <td>{convertDateToDuration(question.date)}</td>
                                    </tr>
                                )
                            })}

                            {this.props.type == "sendedMessages" &&
                            this.props.data.items.results.map((message, table_index) => {
                                return (
                                    <tr className={table_index==this.props.selectedIndex ? "table-selected-row" : "table-row"} 
                                        onClick={() => this.props.handleDataInViewChange(message.id, table_index)}>
                                        <td>{message.title}</td>
                                        <td>{message.sender.username}</td>
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

MessagesTable.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    handleDataChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  
}

export default MessagesTable
