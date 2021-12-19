import { Component } from "react";
import { connect } from "react-redux";
import AccountActivity from "../components/AccountActivity"
import AccountConfiguration from "../components/AccountConfiguration";
import AccountProfile from "../components/AccountProfile";
import AccountShortCut from "../components/AccountShortCut";
import { authSelector } from "../selectors/AuthSelectors";
import { questionSelector } from "../selectors/QuestionSelectors";
import { userSelector } from "../selectors/UserSelectors";
import { sendedMessageSelector, receivedMessageSelector} from "../selectors/MessageSelector";
import { fetchPurchasedObjects } from "../thunks/PurchasedObjectThunk";
import { fetchFollowedObjects } from "../thunks/FollowedObjectThunk";
import { fetchBiddedObjects } from "../thunks/BiddedObjectThunk";
import { fetchActiveObjects } from "../thunks/ActiveObjectThunk";
import { fetchEndedObjects } from "../thunks/EndedObjectThunk";
import { fetchSelledObjects } from "../thunks/SelledObjectThunk";
import { activeObjectSelector, biddedObjectSelector, endedObjectSelector, 
         followedObjectSelector, purchasedObjectSelector, selledObjectSelector } from "../selectors/ObjectSelectors";
import { fetchUserByUsername } from "../fetch/UserFetch";
import { fetchEditUser, fetchUser } from "../thunks/UserThunk";
import {fetchDetailledUser} from "../thunks/DetailledUserThunk"
import { fetchReceivedMessages, fetchSendedMessages } from "../thunks/MessageThunk";
import { fetchQuestionsOfUser } from "../thunks/QuestionThunk";
import AccountObjectList from "../components/AccountObjectList";
import { fetchLogout } from "../thunks/AuthThunk";


class Account extends Component {

    constructor(props) {
        super(props)

        let id = this.props.auth.basicUser.id

        if (!this.props.user.loaded) {
            this.props.fetchDetailledUser(id)
        }

        this.props.fetchSendedMessages(id)
        this.props.fetchReceivedMessages(id)
        this.props.fetchQuestionsOfUser(id)

        this.props.fetchPurchasedObjects(id)
        this.props.fetchActiveObjects(id)
        this.props.fetchSelledObjects(id)
        this.props.fetchBiddedObjects(id)
        this.props.fetchFollowedObjects(id)
        this.props.fetchEndedObjects(id)

        this.state = {
            objectsInView: null,
            objectsType: null,

        }
    }


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleActivityClick = (activity) => {

        this.setState({
            objectsInView: this.props[activity],
            objectsType: activity
        })
    }
    
    handleResetClick = () => {
        this.setState({
            objectsInView: null,
        })
    }

    render() {
        console.log("acti", this.state.objectsInView)
        return(
            <div>
                <h2>Compte</h2>
                <AccountShortCut questions={this.props.questions}
                                 receivedMessages={this.props.receivedMessages}
                                 user={this.props.user}/>
                <AccountActivity
                            handleActivityClick={this.handleActivityClick}
                            objectsInView={this.state.objectsInView}

                            purchasedObjects={ this.props.purchasedObjects}
                            selledObjects= {this.props.selledObjects}
                            activeObjects={this.props.activeObjects}
                            followedObjects={this.props.followedObjects}
                            endedObjects={this.props.endedObjects}
                            biddedObjects={this.props.biddedObjects}

                            user={this.props.user}
                            sendedMessages={this.props.sendedMessages}
                            receivedMessages={this.props.receivedMessages}
                            questions={this.props.questions}/>

               {this.state.objectsInView && 
               
                        <AccountObjectList user={this.props.user}
                                           handleResetClick={this.handleResetClick}
                                           objects={this.state.objectsInView}
                                           objectsType={this.state.objectsType}/>}

                {this.props.user.loaded && 
                        <AccountProfile 
                            fetchEditUser={this.props.fetchEditUser}
                            user={this.props.user}/>}
                

                <AccountConfiguration user={this.props.user} fetchLogout={this.props.fetchLogout}/>
            </div>
        )
    }
}

const AccountStore = connect(
    (state) => ({
        auth: authSelector(state),
        user: userSelector(state),

        purchasedObjects: purchasedObjectSelector(state),
        selledObjects: selledObjectSelector(state),
        activeObjects: activeObjectSelector(state),
        followedObjects: followedObjectSelector(state),
        biddedObjects: biddedObjectSelector(state),
        endedObjects: endedObjectSelector(state),


        receivedMessages: receivedMessageSelector(state),
        sendedMessages: sendedMessageSelector(state),
        questions: questionSelector(state)

    }),
    (dispatch) => ({
        fetchPurchasedObjects: (userId) => dispatch(fetchPurchasedObjects(userId)),
        fetchActiveObjects: (userId) => dispatch(fetchActiveObjects(userId)),
        fetchEndedObjects: (userId) => dispatch(fetchEndedObjects(userId)),
        fetchFollowedObjects: (userId) => dispatch(fetchFollowedObjects(userId)),
        fetchBiddedObjects: (userId) => dispatch(fetchBiddedObjects(userId)),
        fetchSelledObjects: (userId) => dispatch(fetchSelledObjects(userId)),

        fetchDetailledUser: (userId) => dispatch(fetchDetailledUser(userId)),
        fetchEditUser: (userId, modification) => dispatch(fetchEditUser(userId, modification)),
        fetchSendedMessages: (userId) => dispatch(fetchSendedMessages(userId)),
        fetchReceivedMessages: (userId) => dispatch(fetchReceivedMessages(userId)),
        fetchQuestionsOfUser: (userId) => dispatch(fetchQuestionsOfUser(userId)),
        fetchLogout: () => dispatch(fetchLogout()),

    })
)(Account)



export default AccountStore