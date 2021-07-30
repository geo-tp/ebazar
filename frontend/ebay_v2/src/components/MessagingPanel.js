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
import { fetchSendedMessages, fetchReceivedMessages } from "../thunks/MessageThunk";
import {fetchQuestionsOfUser} from "../thunks/QuestionThunk"


class MessagingPanel extends Component {


    constructor(props) {
        super(props)

        this.state = {
            isInit: 0,    

            dataSetInView: this.props[this.props.dataSetType]

        }

    }

    initView = () => {

        this.setState({
            isInit: 1,

            dataInView: this.state.dataSetInView.items.results[this.props.dataInViewIndex ? this.props.dataInViewIndex : 0],
        }, console.log("STATE", this.state))

          
    }

    handleDataChange = (set_name) => {
        this.setState ({
            dataSetType: this.props[set_name],
            // actual_type : set_name,
            dataInViewIndex: 1,
            dataInView: this.props.receivedMessages.results[0]
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

        console.log("RECEIVED MESS", this.props[this.props.dataSetType])

        if (this.state.dataSetInView.loaded && !this.state.isInit) {

            this.initView()
        }


            return(
                <div className="main-message-panel">
                    <h3>Messagerie</h3>
                    <div className="main-message-panel__messages-wrapper">
                            {this.state.dataSetInView && <MessagesTable
                                handleDataChange={this.handleDataChange}
                                handleDataInViewChange={this.handleDataInViewChange}
                                data={this.state.dataSetInView}
                                selected_data_index={this.state.dataInViewIndex}
                                type={this.state.dataSetType}
                                data_in_view={this.state.dataInView}/>}
                        <div className="main-message-panel__messages-wrapper__messages-details">
                            {this.state.dataSetInView && this.state.dataSetInView.hasOwnProperty("questions") ? 
                            
                            this.props.questions && <QuestionView question={this.state.dataInView}/>
                            :

                            this.state.dataInView && <MessageView message={this.state.dataInView}/>}
                            {!this.state.dataSetInView && <div style={{"text-align":"center"}}><Loading/></div>}

                        
                            {this.state.dataSetInView != "sendedMessages" && 
                                this.state.dataSetInView && <MessageResponse 
                                    confirmation_data_send={this.state.confirmation_data_send}
                                    requestSendData={this.requestSendData}/>}
                                    </div>
                    </div>
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
        fetchSendedMessages: dispatch((userId) => fetchSendedMessages(userId)),
        fetchReceivedMessages: dispatch((userId) => fetchReceivedMessages(userId)),
        fetchQuestionsOfUser: dispatch((userId) => fetchQuestionsOfUser(userId))
    })

)(MessagingPanel)

MessagingPanel.propTypes = {


    dataInViewIndex: PropTypes.string,
    datainViewType: PropTypes.string,

    sendedMessages: PropTypes.object.isRequired,
    receivedMessages: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,

    fetchSendedMessages: PropTypes.func.isRequired,
    fetchReceivedMessages: PropTypes.func.isRequired,
    fetchQuestionsOfUser: PropTypes.func.isRequired
}

export default MessagingPanelStore