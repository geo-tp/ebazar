import { Component } from "react";
import { Link } from "react-router-dom";

class AccountShortCut extends Component {



    countUnviewed = (data) => {
        
        let count = 0

        if (!data.items.hasOwnProperty("results")) {
            return count
        }

        for (let d of data.items.results) {
            if (!d.viewed) {
                count++
            }
        }
        return count
    }

    render() {
        return(
            <div className="main-account-shortcut">
                <div>
                    <span class="main-account-shortcut__notification">
                        <Link to={"/account/messagerie/"+this.props.user.id+"/questions/0"}><button>Questions</button></Link>
                        <span>{this.countUnviewed(this.props.questions)}</span>
                    </span>
                    <span class="main-account-shortcut__notification">
                        <Link to={"/account/messagerie/"+this.props.user.id+"/messages/0"}><button>Messages</button></Link>
                        <span>{this.countUnviewed(this.props.receivedMessages)}</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default AccountShortCut