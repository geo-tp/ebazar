import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png"

let id = 0

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuIsOpen: false,
            accountMenuIsOpen: false,

            redirectToAuth: false,

            query: null,
        }
    }

    handleEnterPressed(e) {
        if (e.keyCode === 13) {
            window.location.href = "/search/"+this.state.query
        }
    }

    render() {

        let linkList = (navBarType) => {
            return (
                <div className={navBarType}>
                <i onClick={() => this.setState({menuIsOpen: false})}  
                   className=" fa fa-close fa-2x close-menu-cross"></i>
                <ul className="nav-bar__menu__link-list">
                    <li id={id++}>
                        <p>Populaires</p>
                    </li>
                    <li id={id++}>
                        <p>Séléctions</p>
                    </li>
                    <li id={id++}>
                        <p>Nouveautés</p>
                    </li>
                    <li id={id++}>
                        <p>Bon plans</p>
                    </li>
                </ul>

            </div>
            )
        }

        return(
            <div className="nav-bar">

                <div className="nav-bar__nav-site" 
                    onClick={() => this.setState({menuIsOpen: !this.state.menuIsOpen,
                                                        accountMenuIsOpen: false})}>
                    <span className="nav-bar__nav-site__nav-burger">
 
                        <i className="fas fa fa-2x fa-bars"></i>
                    </span>
                    <Link className="nav-bar__logo" to="/home/">
                        <h2 > <img alt="logo" src={logo}/> EBAZAR</h2>
                    </Link>
                </div>
                
                {this.state.menuIsOpen ? 
                    linkList('nav-bar__menu')
                                       :
                    linkList("nav-bar__menu nav-bar__menu--large")
                }

                <div className="nav-bar__search">
                    <input onChange={(e) => this.setState({query: e.target.value})}
                           onKeyDown={(e) => this.handleEnterPressed(e)}
                           className="nav-bar__search-bar" type="text"></input>
                    <Link to={"/search/"+this.state.query}><button className="fas fa fa-search button-search"></button></Link>
                </div>

                <div 
                    onClick={
                        
                        () => this.setState({accountMenuIsOpen : !this.state.accountMenuIsOpen,
                                                     menuIsOpen: false})
                                                    
                    }
                     className="nav-bar__account">

                         
                    <i className="fas fa fa-2x fa-user nav-bar__account-menu"></i>
                    {this.state.accountMenuIsOpen ?
                        <i className="fas fa fa-angle-up nav-bar__account-angle"></i>
                                                  :
                        <i className="fas fa fa-angle-down nav-bar__account-angle"></i>
                    }
                    {this.props.auth.isConnected && <p className="nav-bar__account-pseudo">PsuedoUser</p>}
                </div>


                {this.state.accountMenuIsOpen && 
                    <div className="nav-bar__user">
                        <i onClick={() => this.setState({accountMenuIsOpen: false})} 
                           className=" fa fa-close fa-2x close-menu-cross">    
                        </i>

                        {this.props.auth.isConnected?
                        <ul>
                            <li id={id++}>
                                <p>Profile</p>
                            </li>
                            <li id={id++}>
                                <p>Achat</p>
                            </li>
                            <li id={id++}>
                                <p>Vente</p>
                            </li>
                            <li id={id++}>
                                <p>Solde</p>
                            </li>
                            <li id={id++}>
                                <p>Messagerie</p>
                            </li>
                        </ul>
                                        :
                        <ul className="nav-bar__user-button">
                            <li id={id++}>
                                <p>Connectez vous :</p>
                                <Link to="/auth/"><button>Connexion</button></Link>
                                <p>Pas de compte ?</p>
                                <Link to="/auth/"><button>Inscription</button></Link>
                            </li>
                        </ul>
                        
                        }
                    </div>
                }

        </div>
        )
    }
}

export default NavBar