import { Component } from "react";
import { imageSelector } from "../selectors/ImageSelector";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { fetchImagesOfObject } from "../thunks/ImageThunk";
import { detailledObjectSelector } from "../selectors/DetailledObjectSelector";
import ImageFullScreen from "./ImageFullScreen";



class ImageCaroussel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            displayFullResolution:false

        }
        
        
    }
    
    handleFullResolutionDisplay = () => {
        this.setState({
            displayFullResolution: !this.state.displayFullResolution})
    }

    handleChangeImageCLick = (direction) => {

        switch (direction) {

            case "left":
                if (this.state.currentIndex) {

                    this.setState({
                        currentIndex: this.state.currentIndex-1,
                    })
                }

                else {
                    this.setState({currentIndex: this.props.images.items.length-1})
                }
                break;

            case 'right':
                if (this.state.currentIndex < this.props.images.items.length-1) {
                    this.setState({
                        currentIndex: this.state.currentIndex + 1,
                    })
                }

                else {
                    this.setState({
                        currentIndex: 0,
                    })
                }
                break;
        }
    }

    render() {

        console.log("images", this.props.images, "index", this.state.currentIndex)

        return (
                <div className="main-image-caroussel">
                    <img onClick={() => this.setState({displayFullResolution:true})}
                        src={this.props.images && this.props.images.items[this.state.currentIndex].imageOfObject} />
                    
                    {this.state.displayFullResolution &&
                                                <ImageFullScreen image={this.props.images.items[this.state.currentIndex].imageOfObject }
                                                                handleFullResolutionDisplay={this.handleFullResolutionDisplay}/>}
                    <label className="main-image-caroussel__image-counter">{this.state.currentIndex+1} / {this.props.images.items.length}</label>
                    <button onClick={() => this.handleChangeImageCLick("left")} 
                            className="fa fa-arrow-circle-left main-image-caroussel__left-arrow"></button>
                    <button onClick={() => this.handleChangeImageCLick("right")} 
                            className="fa fa-arrow-circle-right main-image-caroussel__right-arrow"></button>
                </div>
            
        )
    }
}


ImageCaroussel.propTypes = {
    images: PropTypes.object.isRequired,
    detailledObject: PropTypes.object.isRequired,
}

export default ImageCaroussel