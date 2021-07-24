import { Component } from "react";
import { objectSelector } from "../selectors/ObjectSelectors";
import { connect } from "react-redux"
import { getObjects } from "../actions/ObjectActions"
import { fetchEditObject, fetchObjects } from "../thunks/ObjectThunk";
import { fetchCategories } from "../thunks/CategoryThunk"
import { fetchSubCategories } from "../thunks/SubCategoryThunk"
import { fetchOfferBanners } from "../thunks/OfferBannerThunk"
import { categorySelector } from "../selectors/CategorySelector"
import { offerBannerSelector } from "../selectors/OfferBannerSelector";
import { fetchDetailledObject } from "../thunks/DetailledObjectThunk";
import { fetchBidsOfObject } from "../thunks/BidThunk";
import { fetchLogin } from "../thunks/AuthThunk"

import {detailledObjectSelector} from "../selectors/DetailledObjectSelector"

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = { inter: 1 }
        // if (!props.objects.loaded) {
        props.fetchObjects()
        // }

        // if (!props.categories.loaded) {
        props.fetchCategories()
        // }
        props.fetchOfferBanners()

        props.fetchSubCategories(1)

        props.fetchDetailledObject(1)
        props.fetchBidsOfObject(1)

        props.fetchLogin("geo@mail.com", "adminadmin")


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
                <p>{JSON.stringify(this.props.offerBanners)}</p>
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
        fetchLogin: (mail, password) => dispatch(fetchLogin(mail, password))
    }))
)(Home)






export default HomeStore