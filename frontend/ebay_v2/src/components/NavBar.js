import { Component } from "react";
import logo from "./../assets/logo.png"

let id = 0

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuIsOpen: false,
            accountMenuIsOpen: false,
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
                        <p>A Suivre</p>
                    </li>
                    <li id={id++}>
                        <p>Populaire</p>
                    </li>
                    <li id={id++}>
                        <p>Vendre</p>
                    </li>
                    <li id={id++}>
                        <p>Menu</p>
                    </li>
                </ul>

            </div>
            )
        }

        return(
            <div className="nav-bar">

                <div className="nav-bar__nav-site">
                    <span className="nav-bar__nav-site__nav-burger"
                          onClick={() => this.setState({menuIsOpen: !this.state.menuIsOpen,
                                                        accountMenuIsOpen: false})}>
                        <i className="fas fa fa-2x fa-bars"></i>
                    </span>
                    <h2 className="nav-bar__logo"> <img alt="logo" src={logo}/> EBAZAR</h2>
                </div>
                
                {this.state.menuIsOpen ? 
                    linkList('nav-bar__menu')
                                       :
                    linkList("nav-bar__menu nav-bar__menu--large")
                }

                <div className="nav-bar__search">
                    <input className="nav-bar__search-bar" type="text"></input>
                    <button className="fas fa fa-search nav-bar__search-button"></button>
                </div>

                <div onClick={() => this.setState({accountMenuIsOpen : !this.state.accountMenuIsOpen,
                                                     menuIsOpen: false})}
                     className="nav-bar__account">
                    <i className="fas fa fa-2x fa-user nav-bar__account-menu"></i>
                    {this.state.accountMenuIsOpen ?
                        <i className="fas fa fa-angle-up nav-bar__account-angle"></i>
                                                  :
                        <i className="fas fa fa-angle-down nav-bar__account-angle"></i>
                    }
                    <p className="nav-bar__account-pseudo">PsuedoUser</p>
                </div>


                {this.state.accountMenuIsOpen && 
                    <div className="nav-bar__user">
                        <i onClick={() => this.setState({accountMenuIsOpen: false})} 
                           className=" fa fa-close fa-2x close-menu-cross">    
                        </i>

                        {!this.props.user ?
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
                                <button>Connexion</button>
                                <p>Pas de compte ?</p>
                                <button>Inscription</button>
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