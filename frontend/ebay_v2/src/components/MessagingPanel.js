import { Component } from "react";
import Loading from "./Loading";
import MessageResponse from "./MessageResponse";
import MessagesTable from "./MessagesTable";
import MessageView from "./MessageView";
import QuestionView from "./QuestionView";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { receivedMessageSelector, sendedMessageSelector } from "../selectors/MessageSelector";
import { questionSelector } from "../selectors/QuestionSelectors";
import { fetchMessages } from "../thunks/MessageThunk";
import {fetchQuestionsOfUser} from "../thunks/QuestionThunk"


class MessagingPanel extends Component {


    constructor(props) {
        super(props)

        let dataSetInView;
        switch (this.props.dataSetType) {
            case "sendedMessages":
                dataSetInView = this.props.sendedMessages
                break;
            case "receivedMessages":
                dataSetInView = this.props.receivedMessages
                break;
        
            default:
                dataSetInView = this.props.questions.items
        }
          

        this.state = {

            dataInViewIndex : this.props.dataInViewIndex,
            dataInView: this.props.sendedMessages,

            dataSetInView: dataSetInView
        }

    }

    handleDataChange = (set_name) => {
        this.setState ({
            dataSetType: this.state.data[set_name],
            actual_type : set_name,
            selected_data_index: 1,
            data_in_view: this.state.data[set_name] && this.state.data[set_name][0]
        })
    }

    handleDataInViewChange = (data_id, table_index) => {
        this.setState({
            dataInView: this.state.dataSetInView[table_index],
            selected_data_index: table_index
        })

        this.requestDataViewed(table_index, data_id)

    }

    render = () => {

            return(
                <div className="main-message-panel">
                    {/* <h3>Messagerie</h3>
                    <div className="main-message-panel__messages-wrapper">
                            {this.state.dataSetInView && <MessagesTable
                                handleDataChange={this.handleDataChange}
                                handleDataInViewChange={this.handleDataInViewChange}
                                data={this.state.actual_set}
                                selected_data_index={this.state.selected_data_index}
                                type={this.state.actual_type}
                                data_in_view={this.state.data_in_view}/>}
                        <div className="main-message-panel__messages-wrapper__messages-details">
                            {this.state.dataSetInView && this.state.dataSetInView.includes("questions") ? 
                            
                            this.props.questions && <QuestionView question={this.state.dataInView}/>
                            :

                            this.props.messages && <MessageView message={this.state.dataInView}/>}
                            {!this.state.dataSetInView && <div style={{"text-align":"center"}}><Loading/></div>}

                        
                            {this.state.dataSetInView != "sendedMessages" && 
                                this.state.dataSetInView && <MessageResponse 
                                    confirmation_data_send={this.state.confirmation_data_send}
                                    requestSendData={this.requestSendData}/>}
                                    </div>
                    </div> */}
                </div>
            )
        }
}

export const MessagingPanelStore = connect(

    (state) => ({

        sendedMessages: sendedMessageSelector(state),
        receivedMessages: receivedMessageSelector(state),
        questions: questionSelector(state)
    }),
    (dispatch) => ({
        // fetchMessages: dispatch((userId) => fetchMessages(userId)),
        // fetchQuestionsOfUser: dispatch((userId) => fetchQuestionsOfUser(userId))
    })

)(MessagingPanel)

MessagingPanel.propTypes = {


    dataInViewIndex: PropTypes.string,
    datainViewType: PropTypes.string,

    sendedMessages: PropTypes.object.isRequired,
    receivedMessages: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,

    fetchMessages: PropTypes.func.isRequired,
    fetchQuestionsOfUser: PropTypes.func.isRequired
}

export default MessagingPanelStore