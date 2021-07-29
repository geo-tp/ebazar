import { Component } from "react";
import { imageSelector } from "../selectors/ImageSelector";
import PropTypes from "prop-types"


class ImageCaroussel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_index: 0,
        }
    }

    handleChangeImageCLick = (direction) => {

        let current_index = this.state.current_index
        switch (direction) {
            case "left":
                if (this.state.current_index) {
                    this.setState({
                        current_index: current_index - 1,
                    })
                }
                else {
                    this.setState({
                        current_index: this.props.images.items.length-1,
                    })
                }
                break;
            case 'right':
                if (this.state.current_index < this.state.images.items.length - 1) {
                    this.setState({
                        current_index: current_index + 1,
                    })
                }

                else {
                    this.setState({
                        current_index: 0,
                    })
                }
                break;
        }
    }



    render() {

        if (!this.props.images.loaded) {
            return
        }

        return (
            <div className="main-image-caroussel">
                <img src={this.props.image.items[this.state.current_index]} />
                <label className="main-image-caroussel__image-counter">{this.state.current_index+1} / {this.props.images.items.length}</label>
                <button onClick={() => this.handleChangeImageCLick("left")} 
                        className="fa fa-arrow-circle-left main_mage_caroussel__left-arrow"></button>
                <button onClick={() => this.handleChangeImageCLick("right")} 
                        className="fa fa-arrow-circle-right main_mage_caroussel__right-arrow"></button>
            </div>
        )
    }
}

export const ImageCarousselStore = connect(
    (state) => ({
        images: imageSelector(state)
    })
)(ImageCaroussel)

ImageCaroussel.propTypes = {
    images: PropTypes.object.isRequired
}

export default ImageCarousselStore