import { Component } from "react";
import { Link } from "react-router-dom";

class AccountShortCut extends Component {

    render() {
        return(
            <div className="main-account-shortcut">
                <div>
                    <span class="main-account-shortcut__notification">
                        <Link to={"/account/messagerie/"+this.props.user.id+"/questions/0"}><button>Questions</button></Link>
                        <span>{3}</span>
                    </span>
                    <span class="main-account-shortcut__notification">
                        <Link to={"/account/messagerie/"+this.props.user.id+"/messages/0"}><button>Messages</button></Link>
                        <span>{3}</span>
                    </span>
                    <span>
                    <Link><button onClick={() => this.props.handleProfileClick()}>Informations</button></Link>
                    </span>
                    <span>
                        <Link onClick={() => window.scrollTo(0,document.body.scrollHeight)}><button>Configuration</button></Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default AccountShortCut