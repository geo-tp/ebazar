import { Component, createRef } from "react";
import { connect } from "react-redux";
import { offerBannerSelector } from "../selectors/OfferBannerSelectors";
import { fetchOfferBanners } from "../thunks/OfferBannerThunk";
import PropTypes from "prop-types"
import { keyHandler } from "../utils/keyHandler";


class OfferBanner extends Component {

    constructor(props) {
        super(props)

        
        this.state = {
            actual_banner: this.props.offerBanners[0],
            actual_index: 0,

            refs_table: null,
            intervalIsActive:0,
        }

        this.scroll_box_ref = createRef()
        this.interval = null;

        // this.generateRefs()

    }

    // scrollInterval =() => {
    //     this.interval  = setInterval(() => {
    //         this.handleRightClick();
    //       }, 6000);

    // }

    // componentDidMount() {
    //     this.scrollInterval()
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval)
    // }

    generateRefs = () => {
        
        let refs = []
        for(let i = 0 ; i < this.props.offerBanners.items.length ; i++) {
            refs.push(createRef())
        }

        this.setState({refs_table: refs}, ()=>this.render())
        
        if (this.state.intervalIsActive == 0) {
            this.setState({intervalIsActive:1})
        }

    }
    

    handleLeftClick = () => {
        
        let i = 0

        switch (this.state.actual_index) {
            case 0:
                i = this.state.refs_table.length-1
                break;

            default:
                i = this.state.actual_index-1
        }

        this.state.refs_table[i].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        this.setState({actual_index: i})

    }


    handleRightClick() {

        let i = 0
        if (this.state.actual_index == this.state.refs_table.length-1) {
            i = (this.state.refs_table.length-1)*-1
        }
        else {
            i = +1
        }

        this.state.refs_table[this.state.actual_index+i].current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        this.setState({actual_index: this.state.actual_index+i})
    }

    render() {

        {this.props.offerBanners.loaded && !this.state.refs_table && this.generateRefs()}

        return (
            <div className="main-offer-banner">

                <i onClick={() => this.handleRightClick()} id="left-arrow-banner">
                    <i className="fa fa-2x fa-arrow-right main-offer-banner__left-arrow" />
                </i>

                <i onClick={() => this.handleLeftClick()} id="right-arrow-banner">
                    <i className="fa fa-2x fa-arrow-left main-offer-banner__right-arrow" />
                </i>

                <h4>Offres Exclusives</h4>

                <div className="main-offer-banner__scroll-box" ref={this.scroll_box_ref}>
                    {this.state.refs_table &&
                            <div className="main-offer-banner__scroll-box__container">
                                {this.props.offerBanners.loaded && this.props.offerBanners.items.map((banner, index) => {
                                    return <img key={keyHandler()} ref={this.state.refs_table[index]} 
                                                className="main-offer-banner__scroll-box__container__image" 
                                                src={banner.image} />

                                })}
                            </div>
                    }
                </div>
            </div>
        )
    }
}

OfferBanner.propType = {
    offerBanners: PropTypes.object.isRequired,
    fetchOfferBanners: PropTypes.func.isRequired
}

export default OfferBanner