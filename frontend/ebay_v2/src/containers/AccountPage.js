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


class Account extends Component {

    constructor(props) {
        super(props)

        this.props.fetchPurchasedObjects(3)
        this.props.fetchActiveObjects(3)
        this.props.fetchSelledObjects(3)
        this.props.fetchBiddedObjects(3)
        this.props.fetchFollowedObjects(3)
        this.props.fetchEndedObjects(3)
    }

    render() {
        return(
            <div>
                <h2>Compte</h2>
                <AccountShortCut user={this.props.user}/>
                <AccountActivity user={this.props.user}/>
                <AccountProfile user={this.props.user}/>
                <AccountConfiguration user={this.props.user}/>
            </div>
        )
    }
}

const AccountStore = connect(
    (state) => ({
        auth: authSelector(state),
        user: userSelector(state),
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
        fetchSelledObjects: (userId) => dispatch(fetchSelledObjects(userId))
    })
)(Account)


Account.propTypes = {

}


export default AccountStore