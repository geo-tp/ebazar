import { Component } from "react";
import {request_formatter }from "../../../GLOBAL";
import "./style.css"
import BidBox from "./BidBox/BidBox"
import BidList from "./BidList/BidList"
import Questions from "./Questions/Questions"
import {Link} from "react-router-dom"
import Caroussel from "../Caroussel/Caroussel";
import Loading from "../Loading/Loading";
import PropTypes from 'prop-types'
import { convertSecondsToDays, convertSecondsToHours } from "../utils/timeConverters";



class ObjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remainingTime: 0,
            remainingText : "",
            showBidBox: 0,
            showBidList: 0,

            mainImage: this.props.obj.images[0]
        }

    }
    
    componentDidMount() {
        this.setRemainingTime()
        this.interval = setInterval(() => this.updateRemainingTime(), 1000)
    }

    // componentDidUpdate(prevProps) {

    //     if(prevProps != this.props) {
    //         this.props.request_for_detailled_object(this.props.obj.id)
    //     }
    // }





    // requestForOwner = () => {

    //     let url = request_formatter({
    //         model:"user",
    //         filter_field:"username",
    //         filter_value: this.obj.user
    //     })

    //     fetch(url)
    //         .then(rslt => rslt.json())
    //         .then(json_data => {
    //             this.setState({owner: json_data.results[0]})
    //         })
    // }

    // componentWillReceiveProps(newprops) {
    //     this.requestForDetailledObject()
    // }



    // requestFollowObject = () => {

    //     let url = request_formatter({
    //         model: "followed-object"
    //     })

    //     fetch(url, {
    //         method: "POST",
    //         headers: {"Accept": "application/json",
    //                   'Content-Type': 'application/json',
    //                   "Authorization": "token "+this.props.token
    //         },
    //         body : JSON.stringify({
    //             obj: this.props.obj.id,
    //             user: this.props.user.id
    //         })
    //     })
    //         .then(() => this.props.request_for_detailled_object(this.props.obj.id))

    // }

    // async requestUnfollowObject() {

    //     let url = request_formatter({
    //         model: "followed-object",
    //         filter_fields :["user", "obj"],
    //         filter_values : [this.props.user.id, this.props.obj.id]
    //     })

    //     let follow = await fetch(url, {
    //         headers: {"Accept": "application/json",
    //         'Content-Type': 'application/json',
    //         "Authorization": "token "+this.props.token}
    //     })
    //     let json_follow = await follow.json()
    //     json_follow = json_follow.results[0]

    //     url = request_formatter({
    //         model: "followed-object",
    //         pk: await json_follow.id
    //     })

    //     fetch(url, {
    //         method:"DELETE",
    //         headers: {"Accept": "application/json",
    //                   'Content-Type': 'application/json',
    //                   "Authorization": "token "+this.props.token}
    //     })
    //         .then(() => this.props.request_for_detailled_object(this.props.obj.id))

    // }

    setRemainingTime = () => {
        
        let now = new Date()
        let ending = new Date(this.props.obj.endingDate)

        let remaining =(ending-now)/1000
        this.setState({remainingTime: remaining })

    }

    updateRemainingTime = () => {
        
        let remaining = this.state.remainingTime

        let jours = convertSecondsToDays(remaining)
        let {sec, min, hour} = this.convertSecondsToHours(remaining)
        this.setState({remainingText: jours + "jour(s) " + hour + "heure(s) " +
                                      min + "minutes " + sec + "seconde(s)",
                       remainingTime: this.state.remainingTime - 1})
    }

    handleBidBoxClick = () => {

        if (this.state.showBidBox) {
            this.setState({showBidBox: 0})
        }

        else {
            this.setState({showBidBox: 1})
        }
    }

    handleBidListClick = () => {
        if (this.state.showBidList) {
            this.setState({showBidList: 0})
        }

        else {
            this.setState({showBidList: 1})
        }
    }


    render() {
        console.log("PROPSuser", this.props.user)
        return(
            <div>
                {!this.props.obj && <Loading/>}
                {this.props.obj && <section id="work" className="work">
                <h3>{this.props.title}</h3>
                    <h2 className="work__heading title">{this.props.obj.title}</h2>
                    <div className="work__wrapper wrapper--large">
                        <ul className="work__list">
                            <li className="work__list-el work__list-el--is-active">
                                <div className="work__content">
                                    <div id="detailled-object-box" className="work__content-blurb blurb blurb--framed">
                                        <h3 className="blurb__heading">{this.props.obj.actualPrice} €</h3>
                                        <a className='bid-link' onClick={() => this.handleBidListClick()}><p>{this.props.obj["bids"] && this.props.obj.numberOfBids} enchère(s)</p></a>

                                        {this.props.obj.isActive == "False" ?
                                            
                                            <h4 className="blurb__copy">Vente terminée</h4>
                                                                            :
                                            <div>
                                                {this.props.obj.isFollowed ? 
                                                                        <p><button onClick={() => this.requestUnfollowObject()} class="unfollow">Ne plus suivre</button></p>
                                                                        :
                                                                        this.props.isConnected && this.props.obj.isActive?
                                                                                        <p><button onClick={() => this.requestFollowObject()} class="follow">Suivre</button></p>
                                                                                                :
                                                                                        <p><Link to="/auth"><button class="follow">Suivre</button></Link></p>
                                                }
                                                {!!this.state.showBidList && <BidList bidList={this.props.obj["bids"]}/> }
                                                <div className="remaining-time-box">
                                                    <p id="ramaining-time" class="blurb__copy"> Il reste {this.state.remainingText}</p>
                                                </div>
                                                {this.props.isConnected ? 
                                                    <button onClick={() => this.handleBidBoxClick()} id="bid-button">Enchérir</button>
                                                    :
                                                    <Link to="/auth"><button id="bid-button">Enchérir</button></Link>
                                                }
                                                {!!this.state.showBidBox && <BidBox request_for_detailled_object={this.props.request_for_detailled_object}
                                                                                    user={this.props.user} token = {this.props.token} obj_id={this.props.obj.id}/>}
                                            </div>
                                        }
                                        <div className="description-box">
                                            <p className="blurb__copy">{this.props.obj.description}</p>
                                            {/* <p>{this.props.obj['bids'].numberOfBids}</p> */}
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Etat :</td>
                                                        <td>{this.props.obj.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Livraison :</td>
                                                        <td>{this.props.obj.shippingPrice} €</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Retour :</td>
                                                        {this.props.obj.returnPolicy ? <td>Non</td>
                                                                                     : <td>Oui</td>}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    {!!this.props.obj.isOwner && <p><Link to={"/modifier/"+this.props.obj.id}><button>Modifier</button></Link></p>}
                                    <Link to={"/user/"+this.props.obj.user}><span>Vendeur :</span>{this.props.obj.user}</Link>
                                </div>
                                {this.props.obj.images && <Caroussel mainImage={this.state.mainImage} 
                                                                     images={this.props.obj.images}/>}
                            </li>
                        </ul>
                        <div className="questions-object">
                            <h4>QUESTIONS SUR L'OBJET</h4>
                            {this.props.obj && this.props.obj["questions"] ? 
                                    <Questions user={this.props.user} token={this.props.token} object_id={this.props.obj.id} questions = {this.props.obj["questions"]}/>
                                    :
                                    <p>Aucune question pour le moment</p>}
                        </div>
                    </div>
                </section>}
            </div>
        )
    }
}

export default ObjectDetails