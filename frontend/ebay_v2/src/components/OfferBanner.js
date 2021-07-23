import { Component, createRef } from "react";
import { request_formatter } from "../../../GLOBAL";
import "./style.css"

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

    }
    
    scrollInterval() {
        this.scrollInterval  = setInterval(() => {
            this.handleRightClick();
          }, 6000);

    }

    generateRefs = () => {
        
        let refs = []
        for(let i = 0 ; i < this.state.offer_banners.length ; i++) {
            refs.push(createRef())
        }

        this.setState({refs_table: refs}, ()=>this.render())
        
        if (this.state.intervalIsActive == 0) {
            this.scrollInterval()
            this.setState({intervalIsActive:1})
        }

    }
    

    handleLeftClick = () => {

        console.log("INDEX", this.state.actual_index)

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
        // console.log("INDEX", this.state.actual_index)

        // switch (this.state.actual_index) {
        //     case this.state.offer_banners.length-1:

        //         this.setState({
        //             actual_index: 0,
        //             actual_banner: this.state.offer_banners[0]
        //         })
        //         break;

        //     default:
        //         this.setState({
        //             actual_index: this.state.actual_index + 1,
        //             actual_banner: this.state.offer_banners[this.state.actual_index+1]
        //         })
    }
    // }

    // requestForOfferBanner() {

    //     let url = request_formatter({
    //         model: "offer-banner"
    //     })

    //     fetch(url)
    //         .then(rslt => rslt.json())
    //         .then(json_rslt =>
    //             this.setState({
    //                 offer_banners: json_rslt.results,
    //                 actual_banner: json_rslt.results[0],
    //                 actual_index: 0
    //             }, () => this.generateRefs()))
    // }

    render() {
        return (
            <div className="main-wrapper-offer-banner">

                <i onClick={() => this.handleRightClick()} id="left-arrow-banner">
                    <i class="fa fa-2x fa-arrow-right" />
                </i>

                <i onClick={() => this.handleLeftClick()} id="right-arrow-banner">
                    <i class="fa fa-2x fa-arrow-left" />
                </i>

                <h4>Offres Exclusives</h4>

                <div className="main-offer-banner" ref={this.scroll_box_ref}>
                    {this.state.refs_table &&
                        <div>
                            <div className="banner-scroll-box">
                                {this.state.offer_banners.map((banner, index) => {
                                    return <img ref={this.state.refs_table[index]} 
                                                className="image-offer-banner" 
                                                src={banner.image} />

                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default OfferBanner