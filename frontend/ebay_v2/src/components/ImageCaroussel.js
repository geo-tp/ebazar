import { Component } from "react";
import { imageSelector } from "../selectors/ImageSelector";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { fetchImagesOfObject } from "../thunks/ImageThunk";
import { detailledObjectSelector } from "../selectors/DetailledObjectSelector";



class ImageCaroussel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_index: 0,
        }

        this.props.fetchImagesOfObject(this.props.detailledObject.item.id)
        
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



        console.log("IMAGE ITM", this.state.current_index)
        return (
            <div className="main-image-caroussel">
                <img src={!!this.props.images.loaded &&
                                    
                                    this.state.current_index == 0 ?
                                                    this.props.detailledObject.item.mainImage
                                                                  : 
                                                    this.props.images.items.length && this.props.images.items[0].imageOfObject} />
                <label className="main-image-caroussel__image-counter">{this.state.current_index+1} / {this.props.images.items.length}</label>
                <button onClick={() => this.handleChangeImageCLick("left")} 
                        className="fa fa-arrow-circle-left main-image-caroussel__left-arrow"></button>
                <button onClick={() => this.handleChangeImageCLick("right")} 
                        className="fa fa-arrow-circle-right main-image-caroussel__right-arrow"></button>
            </div>
        )
    }
}

export const ImageCarousselStore = connect(
    (state) => ({
        images: imageSelector(state),
        detailledObject: detailledObjectSelector(state)
    }),
    (dispatch) => ({
        fetchImagesOfObject: (objectId) => dispatch(fetchImagesOfObject(objectId))
    })
)(ImageCaroussel)

ImageCaroussel.propTypes = {
    images: PropTypes.object.isRequired,
    detailledObject: PropTypes.object.isRequired,

    fetchImagesOfObject: PropTypes.object.isRequired
}

export default ImageCarousselStore