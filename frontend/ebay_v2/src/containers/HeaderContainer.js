import { Component } from "react";
import NavBar from "../components/NavBar"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { authSelector } from "../selectors/AuthSelectors";
import { userSelector } from "../selectors/UserSelectors";


class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="header">
                <NavBar auth={this.props.auth}/>
            </div>
        )
    }
}

Header.propTypes = {

}

const HeaderContainer = connect(
    (state) => ({
        auth: authSelector(state),
        user: userSelector(state)
    }),
    (dispatch) => ({

    })
)(Header)

export default HeaderContainer