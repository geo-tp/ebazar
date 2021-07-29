import { Component } from "react";
import { objectSelector } from "../selectors/ObjectSelectors";
import { connect } from "react-redux"
import { fetchEditObject, fetchObjects } from "../thunks/ObjectThunk";
import { fetchCategories } from "../thunks/CategoryThunk"
import { fetchSubCategories } from "../thunks/SubCategoryThunk"
import { fetchOfferBanners } from "../thunks/OfferBannerThunk"
import { categorySelector } from "../selectors/CategorySelectors"
import { offerBannerSelector } from "../selectors/OfferBannerSelectors";
import { fetchDetailledObject } from "../thunks/DetailledObjectThunk";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import { fetchLogin } from "../thunks/AuthThunk"
import { fetchSelections } from "../thunks/SelectionThunk"
import { fetchMessages } from "../thunks/MessageThunk"

import {detailledObjectSelector} from "../selectors/DetailledObjectSelector"
import { fetchQuestionsOfObject, fetchQuestionsOfUser } from "../thunks/QuestionThunk";
import CategoryBannerStore from "../components/CategoryBanner";
import OfferBannerStore from "../components/OfferBanner";
import CookieBannerStore from "../components/CookieBanner";
import ObjectListStore from "../components/ObjectList";
import { MessagingPanelStore } from "../components/MessagingPanel";
import { ObjectFormStore } from "../components/ObjectForm";


class Home extends Component {

    constructor(props) {

        super(props)

        this.state = { inter: 1 }
        // if (!props.objects.loaded) {
        // props.fetchObjects()
        // }

        // props.fetchCategories()
        // props.fetchOfferBanners()

        // props.fetchSubCategories(1)

        // props.fetchDetailledObject(1)
        // props.fetchBidsOfObject(1)

        // props.fetchLogin("geo@mail.com", "adminadmin")
        props.fetchQuestionsOfUser(2)

        props.fetchMessages(2, "receiver")
        props.fetchMessages(2, "sender")

    }

    // componentDidMount() {


    // }

    render() {
        // if (this.state.inter && this.props.objects.items.hasOwnProperty("results")) {
        //     let object = this.props.objects.items.results[0]
        //     console.log("OBJJECJTJJEJCT", this.props.objects)
        //     object.title = "CHANGEEEEEEEEEEEEED"
        //     this.props.fetchEditObject(object)
        //     this.setState({inter: 0})
        // }
        // let object = this.props.objects[0]
        // console.log("OBJJECJTJJEJCT", this.props.objects)
        // object.title = "CHANGEEEEEEEEEEEEED"
        // this.props.fetchEditObject(object)
        console.log(this.props.categories)
        return (
            <div>
                <CategoryBannerStore/>
                <OfferBannerStore/>
                <CookieBannerStore/>
                {/* <ObjectListStore listLabel="Home"/> */}
                <MessagingPanelStore datailInViewIndex="1" dataSetType="receivedMessages"/>
                <ObjectFormStore/>
            </div>
        )
    }
}


const HomeStore = connect(
    (state) => ({
        objects: objectSelector(state),
        categories: categorySelector(state),
        offerBanners: offerBannerSelector(state),
        detailledObject: detailledObjectSelector(state),
    }),
    (dispatch => ({
        fetchObjects: () => dispatch(fetchObjects()),
        fetchEditObject: (object) => dispatch(fetchEditObject(object)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOfferBanners: () => dispatch(fetchOfferBanners()),
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
        fetchDetailledObject: (objectId) => dispatch(fetchDetailledObject(objectId)),
        fetchBidsOfObject: (objectId) => dispatch(fetchBidsOfObject(objectId)),
        fetchQuestionsOfObject: (objectId) => dispatch(fetchQuestionsOfObject(objectId)),
        fetchQuestionsOfUser: (userId) => dispatch(fetchQuestionsOfUser(userId)),
        fetchLogin: (mail, password) => dispatch(fetchLogin(mail, password)),
        fetchSelections: () => dispatch(fetchSelections()),
        fetchMessages: (userId, type) => dispatch(fetchMessages(userId, type)),
    }))
)(Home)

export default HomeStore