import { Component } from "react";
import NavBar from "./NavBar"

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="header">
                <NavBar/>
            </div>
        )
    }
}

export default Header