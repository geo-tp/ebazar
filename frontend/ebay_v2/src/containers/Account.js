import { Component } from "react";
import { connect } from "react-redux";
import AccountActivity from "../components/AccountActivity"
import AccountConfiguration from "../components/AccountConfiguration";
import AccountProfile from "../components/AccountProfile";
import AccountShortCut from "../components/AccountShortCut";


class Account extends Component {

    render() {
        return(
            <div>
                <AccountShortCut/>
                <AccountActivity/>
                <AccountProfile/>
                <AccountConfiguration/>
            </div>
        )
    }
}

const AccountStore = connect(
    (state) => ({

    }),
    (dispatch) => ({

    })
)(Account)


Account.propTypes = {

}


export default AccountStore