import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
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
                        <NavLink className="no-underline" 
                                 to="/choice/popular">
                            <p>Populaires</p>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <NavLink className="no-underline" 
                                    to="/choice/new">
                                <p>Nouveautés</p>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <NavLink className="no-underline" 
                                    to="/choice/cheap">
                                <p>Prix Mini</p>
                        </NavLink>
                    </li>
                    <li id={id++}>
                        <p>Aide</p>
                    </li>
                </ul>

            </div>
            )
        }

        let path = this.state.query ? "/search/"+this.state.query : '/search'

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
                    <Link to={path}><button className="fas fa fa-search button-search"></button></Link>
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
                    {this.props.auth.connected && 
                        <p className="nav-bar__account-pseudo">{this.props.auth.basicUser.username}</p>}
                </div>


                {this.state.accountMenuIsOpen && 
                    <div className="nav-bar__user">
                        <i onClick={() => this.setState({accountMenuIsOpen: false})} 
                           className=" fa fa-close fa-2x close-menu-cross">    
                        </i>

                        {this.props.auth.connected?
                        <ul>
                            <li id={id++}>
                            <Link to="/account/"
                                  onClick={() => this.setState({accountMenuIsOpen: false})}>
                                
                                <button>Compte</button>

                            </Link>

                            </li>

                            <li id={id++}>
                            <Link to="/selled/"
                                  onClick={() => this.setState({accountMenuIsOpen: false})}>
                                
                                <button>Vente</button>

                            </Link>
                            </li>

                            <li id={id++}>
                            <Link to="/purchased/"
                                  onClick={() => this.setState({accountMenuIsOpen: false})}>
                                
                                <button>Achat</button>

                            </Link>
                            </li>
                            <li id={id++}>
                                <Link to="/balance/"
                                      onClick={() => this.setState({accountMenuIsOpen: false})}>
                                    
                                    <button>Balance</button>
                                </Link>
                            </li>
                            <li id={id++}>
                               <Link to="/messaging/"
                                     onClick={() => this.setState({accountMenuIsOpen: false})}>
                                         
                                    <button>Messagerie</button>
                                </Link>
                            </li>
                        </ul>
                                        :
                        <ul className="nav-bar__user-button">
                            <li id={id++}>
                                <p>Connectez vous :</p>
                                <Link to="/auth/"
                                      onClick={() => this.setState({accountMenuIsOpen: false})}>
                                          
                                    <button>Connexion</button>
                                
                                </Link>

                                <p>Pas de compte ?</p>
                                <Link to="/auth/"
                                      onClick={() => this.setState({accountMenuIsOpen: false})}>
                                    
                                    <button>Inscription</button>
                                
                                </Link>
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