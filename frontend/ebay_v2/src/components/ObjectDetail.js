import { Component } from "react";
import { Link } from "react-router-dom"
import Loading from "../components/Loading";
import PropTypes from 'prop-types'
import { convertSecondsToDays, convertSecondsToHours } from "../utils/timeConverters";
import {
    detailledObjectBidSelector, detailledObjectImageSelector,
    detailledObjectQuestionSelector, detailledObjectSelector
} from "../selectors/DetailledObjectSelector";
import ImageCarousselStore from "./ImageCaroussel";
import ObjectDetailQuestionListStore from "./ObjectDetailQuestionList"
import ObjectDetailBidListStore from "./ObjectDetailBidList"
import ObjectDetailBidFormStore from "./ObjectDetailBidForm";
import { connect } from "react-redux";
import { fetchDetailledObject } from "../thunks/DetailledObjectThunk";
import { fetchObjects } from "../thunks/ObjectThunk";


class ObjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remainingTime: 0,
            remainingText: "",
            showBidBox: 0,
            showBidList: 0,
        }

        this.props.fetchDetailledObject(this.props.detailledObjectId)
                .then(() => this.props.fetchObjects())

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

    // componentWillReceiveProps(newprops) {
    //     this.requestForDetailledObject()
    // }


    setRemainingTime = () => {

        let now = new Date()
        let ending = new Date(this.props.detailledObject.endingDate)

        let remaining = (ending - now) / 1000
        this.setState({ remainingTime: remaining })

    }

    updateRemainingTime = () => {

        let remaining = this.state.remainingTime

        let jours = convertSecondsToDays(remaining)
        let { sec, min, hour } = convertSecondsToHours(remaining)
        this.setState({
            remainingText: jours + "jour(s) " + hour + "heure(s) " +
                min + "minutes " + sec + "seconde(s)",
            remainingTime: this.state.remainingTime - 1
        })
    }

    handleBidBoxClick = () => {

        if (this.state.showBidBox) {
            this.setState({ showBidBox: 0 })
        }

        else {
            this.setState({ showBidBox: 1 })
        }
    }

    handleBidListClick = () => {
        if (this.state.showBidList) {
            this.setState({ showBidList: 0 })
        }

        else {
            this.setState({ showBidList: 1 })
        }
    }


    render() {
        return (
            <div>
                {!this.props.detailledObject.loaded && <Loading />}
                {this.props.detailledObject.loaded &&
                <div className="main-detailled-object">
                    <section className="wrapper">
                        <h3>{this.props.title}</h3>
                        <h2 className="main-detailled-object__title">{this.props.detailledObject.item.title}</h2>
                        <div className="main-detailled-object__wrapper">
                            <ul className="main-detailled-object__list">
                                <li className="main-detailled-object__list-el main-detailled-object__list-el--is-active">
                                    <div className="main-detailled-object__content">
                                        <div className="main-detailled-object__content-blurb">
                                            <h3 className="main-detailled-object__content-blurb__heading">{this.props.detailledObject.item.actualPrice} €</h3>
                                            <a className='main-detailled-object__content-blurb__bid-list' onClick={() => this.handleBidListClick()}><p>{this.props.detailledObjectBids && this.props.detailledObjectBids.items.length} enchère(s)</p></a>

                                            {this.props.detailledObject.item.isActive == "False" ?

                                                <h4 className="main-detailled-object__content-blurb__sale-over">Vente terminée</h4>
                                                :
                                                <div>
                                                    {this.props.detailledObject.item.isFollowed ?
                                                        <p><button onClick={() => this.requestUnfollowObject()} class="button-unfollow">Ne plus suivre</button></p>
                                                        :
                                                        this.props.isConnected && this.props.detailledObject.item.isActive ?
                                                            <p><button onClick={() => this.requestFollowObject()} class="button-follow">Suivre</button></p>
                                                            :
                                                            <p><Link to="/auth"><button class="button-follow">Suivre</button></Link></p>
                                                    }
                                                    {this.props.detailledObject.loaded && <ObjectDetailBidListStore />}
                                                    <div className="remaining-time-box">
                                                        <p id="ramaining-time-box__time"> Il reste {this.state.remainingText}</p>
                                                    </div>
                                                    {this.props.isConnected ?
                                                        <button onClick={() => this.handleBidBoxClick()} class="button-bid">Enchérir</button>
                                                        :
                                                        <Link to="/auth"><button id="button-bid">Enchérir</button></Link>
                                                    }
                                                    <ObjectDetailBidFormStore />
                                                </div>
                                            }
                                            <div className="description-box">
                                                <p className="descption-box__description">{this.props.detailledObject.item.description}</p>
                                                {/* <p>{this.props.obj['bids'].numberOfBids}</p> */}
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Etat :</td>
                                                            <td>{this.props.detailledObject.item.state}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Livraison :</td>
                                                            <td>{this.props.detailledObject.item.shippingPrice} €</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Retour :</td>
                                                            {this.props.detailledObject.item.returnPolicy ? <td>Non</td>
                                                                : <td>Oui</td>}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                        {!!this.props.detailledObject.item.isOwner && <p><Link to={"/modifier/" + this.props.detailledObject.item.id}><button>Modifier</button></Link></p>}
                                        <Link to={"/user/" + this.props.detailledObject.item.user}><span>Vendeur :</span>{this.props.detailledObject.item.user}</Link>
                                    </div>
                                    {this.props.detailledObject.loaded  && <ImageCarousselStore />}
                                </li>
                            </ul>
                            {this.props.detailledObject.loaded && <ObjectDetailQuestionListStore />}
                            
                        </div>
                    </section>
                </div>}
            </div>
        )
    }
}

export const ObjectDetailStore = connect(
    (state) => ({
        detailledObject: detailledObjectSelector(state),
        detailledObjectQuestions: detailledObjectQuestionSelector(state),
        detailledObjectBids: detailledObjectBidSelector(state),
        detailledObjectImages: detailledObjectImageSelector(state),
    }),
    (dispatch) => ({
        fetchDetailledObject: (objectId) => dispatch(fetchDetailledObject(objectId)),
        fetchObjects: (filter) => dispatch(fetchObjects(filter)),
    })
)(ObjectDetail)

ObjectDetail.propTypes = {

    detailledObjectId : PropTypes.string.isRequired,

    detailledObject: PropTypes.object.isRequired,
    detailledObjectQuestions: PropTypes.object.isRequired,
    detailledObjectBids: PropTypes.object.isRequired,
    detailledObjectImages: PropTypes.object.isRequired,

    fetchDetailledObject: PropTypes.func.isRequired
}

export default ObjectDetailStore