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

const SELECTED_DATA = {"questions": 1, "receivedMessages": 2, "sendedMessages": 3}

class MessagingPanel extends Component {


    constructor(props) {
        super(props)

        this.state = {
            isInit: 0,    

            dataSetInView: this.props[this.props.dataSetType],
            dataInView: this.props[this.props.dataSetType][this.props.dataIndex],
            dataInViewIndex: this.props.dataIndex,
            dataSetType: this.props.dataSetType,
            selectedData: SELECTED_DATA[this.props.dataSetType]

        }
        

    }

    initView = () => {

        this.setState({
            isInit: 1,

            dataInView: this.state.dataSetInView.items.results[
                    this.state.dataIndex ? this.state.dataIndex : 0
            ],

        })

          
    }

    handleDataChange = (set_name) => {
        this.setState ({
            dataSetInView: this.props[set_name],
            // actual_type : set_name,
            dataInViewIndex: null,
            dataInView: null,
            dataSetType: set_name,
            selectedData: SELECTED_DATA[set_name]
        })
    }

    handleDataInViewChange = (dataId, tableIndex) => {

        this.setState({
            dataInView: this.state.dataSetInView.items.results[tableIndex],
            dataInViewIndex: tableIndex
        })

        // this.requestDataViewed(tableIndex, dataId)

    }

    render = () => {

        // if (this.state.dataSetInView.loaded && !this.state.isInit) {

        //     this.initView()
        // }


            return(
                <div>
                    <h3>Messagerie</h3>
                    <div className="main-message-panel">
                        <div className="main-message-panel__messages-wrapper">
                                    
                                    <MessagesTable
                                        handleDataChange={this.handleDataChange}
                                        handleDataInViewChange={this.handleDataInViewChange}
                                        data={this.state.dataSetInView}
                                        selectedData={this.state.selectedData}
                                        selectedIndex={this.state.dataInViewIndex}
                                        type={this.state.dataSetType}
                                        dataInView={this.state.dataInView}/>

                            <div className="main-message-panel__messages-wrapper__container">
                                <div className="main-message-panel__messages-wrapper__container_messages-details">
                                    {this.state.dataSetType.includes("Messages") ? 
                                    
                                    <MessageView message={this.state.dataInView}/>
                                    :
                                    this.props.questions && <QuestionView question={this.state.dataInView}/> }
                                    
                                </div>
                                <div className="main-message-panel__messages-wrapper__container__messages-response">
                                    {this.state.dataSetType != "sendedMessages" && 
                                        this.state.dataSetInView && <MessageResponse 
                                            confirmation_data_send={this.state.confirmation_data_send}
                                            requestSendData={this.requestSendData}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
}

// export const MessagingPanel = connect(

//     (state) => ({

//         sendedMessages: sendedMessageSelector(state),
//         receivedMessages: receivedMessageSelector(state),
//         questions: questionSelector(state)
//     }),
//     (dispatch) => ({
//         fetchSendedMessages: dispatch((userId) => fetchSendedMessages(userId)),
//         fetchReceivedMessages: dispatch((userId) => fetchReceivedMessages(userId)),
//         fetchQuestionsOfUser: dispatch((userId) => fetchQuestionsOfUser(userId))
//     })

// )(MessagingPanel)

MessagingPanel.propTypes = {


    dataInViewIndex: PropTypes.string,
    datainViewType: PropTypes.string,

    sendedMessages: PropTypes.object.isRequired,
    receivedMessages: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,

    // fetchSendedMessages: PropTypes.func.isRequired,
    // fetchReceivedMessages: PropTypes.func.isRequired,
    // fetchQuestionsOfUser: PropTypes.func.isRequired
}

export default MessagingPanel