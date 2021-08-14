import { Component } from "react";
import { Redirect, withRouter } from "react-router";
import MessagingPanel from "../components/MessagingPanel";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { authSelector } from "../selectors/AuthSelectors";
import { userSelector } from "../selectors/UserSelectors";
import { receivedMessageSelector, sendedMessageSelector } from "../selectors/MessageSelector";
import { questionSelector } from "../selectors/QuestionSelectors";
import { fetchReceivedMessages, fetchSendedMessages } from "../thunks/MessageThunk";
import { fetchQuestionsOfUser } from "../thunks/QuestionThunk";
import Loading from "../components/Loading";

class Messaging extends Component {

    constructor(props) {
        super(props)

        if (this.props.auth.connected) {

            let id = this.props.auth.basicUser.id

            props.fetchQuestionsOfUser(id)
            props.fetchReceivedMessages(id)
            props.fetchSendedMessages(id)

        }

        // if route is /messaging without params, default is question set
        if (!this.props.match.params.dataSet) {
            this.props.match.params.dataSet = "questions"
        } 
    }

    render() {

        if (!this.props.auth.connected) {
            return <Redirect to="/auth" />
        }

        console.log("LOAD", this.props.questions.loaded, 
                            this.props.receivedMessages.loaded,
                            this.props.sendedMessages.loaded)
        return (
            this.props.questions.loaded &&
            this.props.receivedMessages.loaded &&
            this.props.sendedMessages.loaded ?
            <MessagingPanel user={this.props.user}
                    dataSetType={this.props.match.params.dataSet}
                    dataIndex={this.props.match.params.dataIndex}
                    sendedMessages={this.props.sendedMessages}
                    receivedMessages={this.props.receivedMessages}
                    questions={this.props.questions} />
                                            :
            <Loading/>

        )
    }
}

const MessagingPage = connect(
    (state) => ({
        auth: authSelector(state),
        user: userSelector(state),
        sendedMessages: sendedMessageSelector(state),
        receivedMessages: receivedMessageSelector(state),
        questions: questionSelector(state)

    }),
    (dispatch) => ({
        fetchSendedMessages: (userId) => (dispatch(fetchSendedMessages(userId))),
        fetchReceivedMessages: (userId) => (dispatch(fetchReceivedMessages(userId))),
        fetchQuestionsOfUser: (userId) => (dispatch(fetchQuestionsOfUser(userId))),

    })
)(Messaging)

Messaging.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    sendedMessages: PropTypes.object.isRequired,
    receivedMessages: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,

    fetchSendedMessages: PropTypes.func.isRequired,
    fetchReceivedMessages: PropTypes.func.isRequired,
    fetchQuestionsOfUser: PropTypes.func.isRequired,

}

export default withRouter(MessagingPage)