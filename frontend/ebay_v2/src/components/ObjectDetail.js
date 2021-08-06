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
import { fetchBidsOfObject } from "../thunks/BidThunk";
import { fetchQuestionsOfObject } from "../thunks/QuestionThunk";


class ObjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remainingTime: null,
            remainingText: "",
            showBidBox: false,
            showBidList: false,
            intervalStarted : false
        }

        this.props.fetchDetailledObject(this.props.detailledObjectId)
        this.props.fetchBidsOfObject(this.props.detailledObjectId)
        this.props.fetchQuestionsOfObject(this.props.detailledObjectId)

        this.interval = setInterval(() => this.updateRemainingTime(), 1000)


    }

    componentDidMount() {

    }

    // componentDidUpdate(prevProps) {

    //     if(prevProps != this.props) {
    //         this.props.request_for_detailled_object(this.props.obj.id)
    //     }
    // }

    componentWillUnmount() {
        clearInterval(this.interval);
      }


    setRemainingTime = () => {

        let now = new Date()
        let ending = new Date(this.props.detailledObject.item.endingDate)
        console.log("dddd", ending)
        let remaining = (ending - now) / 1000
        this.setState({ remainingTime: remaining })

        console.log("SETREM", remaining)

    }

    updateRemainingTime = () => {

        
        if (this.state.remainingTime) {
        
            let remaining = this.state.remainingTime

            let jours = convertSecondsToDays(remaining)
            let { sec, min, hour } = convertSecondsToHours(remaining)
            this.setState({
                remainingText: jours + "jour(s) " + hour + "heure(s) " +
                    min + "minutes " + sec + "seconde(s)",
                remainingTime: remaining - 1
            })
        }
    }

    handleBidBoxClick = () => {

        this.setState({showBidBox: !this.state.showBidBox})
    }

    handleBidListClick = () => {
        this.setState({showBidList: !this.state.showBidList})

    }


    render() {

        if (this.props.detailledObject.loaded && !this.state.remainingTime) {
            this.setRemainingTime()
            this.props.fetchObjects(
                {
                    ordering: "-endingDate", 
                }

            )         
        }

        return (
            <div>
                {!this.props.detailledObject.loaded && <Loading />}
                {this.props.detailledObject.loaded &&
                <div className="main-detailled-object">
                    <section className="wrapper">
                        <p className ="main-detailled-object__category">
                            <Link to={'/category/'+this.props.detailledObject.item.category.id}>
                                {this.props.detailledObject.item.category.title}
                            </Link>
                                        /
                            <Link to={'/category/'+this.props.detailledObject.item.category.id}>
                                {this.props.detailledObject.item.subcategory.title}
                            </Link>
                        </p>
                        <h2 className="main-detailled-object__title">{this.props.detailledObject.item.title}</h2>
                        <div className="main-detailled-object__wrapper">
                            <ul className="main-detailled-object__list">
                                <li className="main-detailled-object__list-el main-detailled-object__list-el--is-active">
                                    <div className="main-detailled-object__content">
                                        <div className="main-detailled-object__content-blurb">
                                            <h3 className="main-detailled-object__content-blurb__heading">{this.props.detailledObject.item.actualPrice} €</h3>
                                            {this.props.detailledObject.item.isFollowed ?
                                                        <p><button onClick={() => this.requestUnfollowObject()} class="button-unfollow">Ne plus suivre</button></p>
                                                        :
                                                        this.props.isConnected && this.props.detailledObject.item.isActive ?
                                                            <p><button onClick={() => this.requestFollowObject()} class="button-follow">Suivre</button></p>
                                                            :
                                                            <p><Link to="/auth"><button class="button-follow">Suivre</button></Link></p>
                                            }
                                            <a className='main-detailled-object__content-blurb__bid-list' onClick={() => this.handleBidListClick()}>
                                                <p className="main-detailled-object__content-blurb__bid-list__bid-number">
                                                    {this.props.detailledObjectBids.items.count+" enchère(s)"}
                                                </p>
                                            </a>
                                            {!!this.state.showBidList && <ObjectDetailBidListStore />}

                                            {this.props.detailledObject.item.isActive == "False" ?

                                                <h4 className="main-detailled-object__content-blurb__sale-over">Vente terminée</h4>
                                                :
                                                <div>

                                                    <div className="remaining-time-box">
                                                        <p id="ramaining-time-box__time"> Il reste {this.state.remainingText}</p>
                                                    </div>
                                                    {this.props.isConnected ?
                                                        <button onClick={() => this.handleBidBoxClick()} className="button-open-bid">Enchérir</button>
                                                        :
                                                        <Link to="/auth"><button className="button-open-bid">Enchérir</button></Link>
                                                    }
                                                    {!!this.state.showBidBox && <ObjectDetailBidFormStore />}
                                                </div>
                                            }
                                            <div className="description-box">
                                                <p className="description-box__description">{this.props.detailledObject.item.description}</p>
                                                {/* <p>{this.props.obj['bids'].numberOfBids}</p> */}
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Etat</td>
                                                            <td>{this.props.detailledObject.item.state}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Livraison</td>
                                                            <td>{this.props.detailledObject.item.shippingPrice} €</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Retour</td>
                                                            {this.props.detailledObject.item.returnPolicy ? <td>Non</td>
                                                                : <td>Oui</td>}
                                                        </tr>
                                                        <tr>
                                                            <td>Vendeur</td>
                                                            <td>
                                                                <Link to={"/user/" + this.props.detailledObject.item.user}>
                                                                    {this.props.detailledObject.item.user}
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                        {!!this.props.detailledObject.item.isOwner && <p><Link to={"/modifier/" + this.props.detailledObject.item.id}><button>Modifier</button></Link></p>}
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

// export const ObjectDetailStore = connect(
//     (state) => ({
//         detailledObject: detailledObjectSelector(state),
//         detailledObjectQuestions: detailledObjectQuestionSelector(state),
//         detailledObjectBids: detailledObjectBidSelector(state),
//         detailledObjectImages: detailledObjectImageSelector(state),
//     }),
//     (dispatch) => ({
//         fetchObjects: (filter) => dispatch(fetchObjects(filter)),

//         fetchDetailledObject: (objectId) => dispatch(fetchDetailledObject(objectId)),
//         fetchBidsOfObject: (objectId) => dispatch(fetchBidsOfObject(objectId)),
//         fetchQuestionsOfObject: (objectId) => dispatch(fetchQuestionsOfObject(objectId))

//     })
// )(ObjectDetail)

ObjectDetail.propTypes = {

    detailledObjectId : PropTypes.string.isRequired,

    detailledObject: PropTypes.object.isRequired,
    detailledObjectQuestions: PropTypes.object.isRequired,
    detailledObjectBids: PropTypes.object.isRequired,
    detailledObjectImages: PropTypes.object.isRequired,

    fetchDetailledObject: PropTypes.func.isRequired,
    fetchBidsOfObject: PropTypes.func.isRequired,
    fetchQuestionsOfObject: PropTypes.func.isRequired

}

export default ObjectDetail