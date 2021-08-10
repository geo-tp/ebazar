import { Component } from "react";
import { objectSelector } from "../selectors/ObjectSelectors";
import { connect } from "react-redux"
import { fetchEditObject, fetchNextObjectsPage, fetchObjects } from "../thunks/ObjectThunk";
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
import ObjectListContainer from "./ObjectListContainer";
import SelectionBanner from "../components/SelectionBanner";
import { selectionSelector } from "../selectors/SelectionSelectors";

class Home extends Component {

    constructor(props) {

        super(props)

        this.state = { inter: 1 }
        props.fetchObjects()

        props.fetchSelections()

        props.fetchCategories()
        props.fetchOfferBanners()

        props.fetchSubCategories(1)


    }


    render() {
        return (
            <div className="main-home-page">
                <CategoryBanner categories={this.props.categories}/>
                <OfferBanner offerBanners={this.props.offerBanners}/>
                <SelectionBanner selections={this.props.selections}/>
                <ObjectListContainer listLabel="Home"/>
            </div>
        )
    }
}

Home.propTypes = {
    objects: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    offerBanners: PropTypes.object.isRequired,
    detailledObject: PropTypes.object.isRequired,
    selections: PropTypes.object.isRequired,

    fetchObjects: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchOfferBanners: PropTypes.func.isRequired,
    fetchSubCategories: PropTypes.func.isRequired,
    fetchSelections: PropTypes.func.isRequired,
}

const HomePage = connect(
    (state) => ({
        objects: objectSelector(state),
        categories: categorySelector(state),
        offerBanners: offerBannerSelector(state),
        detailledObject: detailledObjectSelector(state),
        selections: selectionSelector(state),
    }),
    (dispatch => ({
        fetchObjects: () => dispatch(fetchObjects()),
        fetchNextObjectsPage: (url) => dispatch(fetchNextObjectsPage(url)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOfferBanners: () => dispatch(fetchOfferBanners()),
        fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId)),
        fetchSelections: () => dispatch(fetchSelections()),

    }))
)(Home)

export default HomePage