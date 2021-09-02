import { Component } from "react";
import { Redirect, withRouter } from "react-router-dom"
import UserProfile from "./../components/UserProfile"
import ObjectList from "./../components/ObjectList"
import PropTypes from "prop-types"
import { fetchUserByUsername } from "../fetch/UserFetch";
import { connect } from "react-redux";
import { objectSelector } from "../selectors/ObjectSelectors";
import { authSelector } from "../selectors/AuthSelectors";
import { fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
import { API_USER } from "../utils/apiEndPoints";


class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: null,
            error:  null,
            showMessageForm: 0
        }

       this.getUserAndObjects()
    }
    
    async getUserAndObjects() {
        
        let rslt = await fetchUserByUsername(this.props.match.params.username)
        
        if (rslt.hasOwnProperty("error")) {
            this.setState({error:rslt.error})
        }
        
        else {

            this.setState({userProfile: rslt.user})
            this.props.fetchObjects({
                filter_field: "user",
                filter_value: rslt.user.id
            })
        }
    }

    // componentDidMount() {
    //     this.request_profile_user_details()
    // }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        console.log("state", this.state)

        // if (this.props.user == null) {
        //     return <Redirect to="/auth" />
        // }
        return (
            <div>
                {this.state.userProfile && <UserProfile auth={this.props.auth}
                                                        userProfile={this.state.userProfile} />}
                <ObjectList objects={this.props.objects} listLabel="Ses ventes en cours"/>
            </div>
        )
    }
}


User.propTypes = {
    isConnected: PropTypes.number,
    user: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            first_name: PropTypes.string,
            last_name: PropTypes.string,
            date_of_birth: PropTypes.string,
            street_number: PropTypes.string,
            street_type: PropTypes.string,
            street_name: PropTypes.string,
            city_number: PropTypes.string,
            city: PropTypes.string,
        })
        ).isRequired,

        token: PropTypes.string.isRequired,
}

export const UserPage = connect(
    (state) => ({
        objects: objectSelector(state),
        auth: authSelector(state)
    }),
    (dispatch) => ({
        fetchObjects: (filter) => dispatch(fetchObjects(filter)),
        fetchNextObjectsPage : (url) => dispatch(fetchNextObjectsPage(url))
    })
)(User)


export default withRouter(UserPage)
