import { Component, createRef } from "react";
import { connect } from "react-redux";
import { offerBannerSelector } from "../selectors/OfferBannerSelector";
import { fetchOfferBanners } from "../thunks/OfferBannerThunk";
import PropTypes from "prop-types"


class OfferBanner extends Component {

    constructor(props) {
        super(props)

        
        this.state = {
            offer_banners: null,
            actual_banner: null,
            actual_index: null,

            refs_table: null,
            intervalIsActive:0,
        }

        this.scroll_box_ref = createRef()


    }

    componentDidMount() {
        this.props.fetchOfferBanners()
        // this.generateRefs()
    }
    
    scrollInterval() {
        this.scrollInterval  = setInterval(() => {
            this.handleRightClick();
          }, 6000);

    }

    generateRefs = () => {
        
        let refs = []
        for(let i = 0 ; i < this.props.offerBanners.items.length ; i++) {
            refs.push(createRef())
        }

        this.setState({refs_table: refs}, ()=>this.render())
        
        if (this.state.intervalIsActive == 0) {
            this.scrollInterval()
            this.setState({intervalIsActive:1})
        }

    }
    

    handleLeftClick = () => {

        switch (this.state.actual_index) {
            case 0:

                this.setState({
                    actual_index: this.state.offer_banners.length-1,
                    actual_banner: this.state.offer_banners[this.state.offer_banners.length-1]
                })
                break;

            default:
                this.setState({
                    actual_index: this.state.actual_index - 1,
                    actual_banner: this.state.offer_banners[this.state.actual_index-1]
                })
        }

    }


    handleRightClick() {

        let i = 0
        
        if (this.state.actual_index == this.state.refs_table.length-1) {
            i = (this.state.refs_table.length-1)*-1
        }
        else {
            i = +1
        }
        console.log(this.state.actual_index)
        console.log(i)

        this.state.refs_table[this.state.actual_index+i].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        this.setState({actual_index: this.state.actual_index+i})
    }

    render() {
        return (
            <div className="offer-banner">

                <i onClick={() => this.handleRightClick()} id="left-arrow-banner">
                    <i class="fa fa-2x fa-arrow-right offer-banner__left-arrow" />
                </i>

                <i onClick={() => this.handleLeftClick()} id="right-arrow-banner">
                    <i class="fa fa-2x fa-arrow-left offer-banner__right-arrow" />
                </i>

                <h4>Offres Exclusives</h4>

                <div className="offer-banner__scroll-box" ref={this.scroll_box_ref}>
                    {this.state.refs_table &&
                            <div className="offer-banner__scroll-box__container">
                                {this.props.offerBanners.loaded && this.props.offerBanners.items.map((banner, index) => {
                                    return <img ref={this.state.refs_table[index]} 
                                                className="offer-banner__scroll-box__container__image" 
                                                src={banner.image} />

                                })}
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const OfferBannerStore = connect (
    (state) => ({
        offerBanners: offerBannerSelector(state)
    }),
    (dispatch) => ({
        fetchOfferBanners : () => dispatch(fetchOfferBanners())
    })
)(OfferBanner)

OfferBanner.propType = {
    offerBanners: PropTypes.object.isRequired,
    fetchOfferBanners: PropTypes.func.isRequired
}

export default OfferBannerStore