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
import { fetchSendedMessages, fetchReceivedMessages } from "../thunks/MessageThunk"
import {PropTypes} from "prop-types"
import {detailledObjectSelector} from "../selectors/DetailledObjectSelector"
import { fetchQuestionsOfObject, fetchQuestionsOfUser } from "../thunks/QuestionThunk";
import CategoryBanner from "../components/CategoryBanner";
import OfferBanner from "../components/OfferBanner";
import CookieBanner from "../components/CookieBanner";
import ObjectList from "../components/ObjectList";
import SelectionBanner from "../components/SelectionBanner";

class Home extends Component {

    constructor(props) {

        super(props)

        this.state = { inter: 1 }
        if (!props.objects.loaded) {
        props.fetchObjects()
        }

        // props.fetchCategories()
        props.fetchOfferBanners()

        // props.fetchSubCategories(1)

        // props.fetchDetailledObject(1)
        // props.fetchBidsOfObject(1)

        // props.fetchLogin("geo@mail.com", "adminadmin")
        props.fetchQuestionsOfUser(2)

        props.fetchSendedMessages(2)
        props.fetchReceivedMessages(2)

        props.fetchQuestionsOfObject(2)

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
        return (
            <div className="main-home-page">
                <CategoryBanner/>
                <OfferBanner/>
                <SelectionBanner/>
                <ObjectList listLabel="Home"/>
                <CookieBanner/>
            </div>
        )
    }
}

Home.propTypes = {
    objects: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    offerBanners: PropTypes.object.isRequired,
    detailledObject: PropTypes.object.isRequired,

    fetchObjects: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchOfferBanners: PropTypes.func.isRequired,
    fetchSubCategories: PropTypes.func.isRequired,
    fetchSelections: PropTypes.func.isRequired,
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
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOfferBanners: () => dispatch(fetchOfferBanners()),
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
        fetchSelections: () => dispatch(fetchSelections()),

    }))
)(Home)

export default HomeStore