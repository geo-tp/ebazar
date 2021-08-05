import { Component } from "react";
import PropTypes from "prop-types"


class ImageFullScreen extends Component {

    render() {
        return(
            <div className="main-image-full-screen">
                <img src={this.props.image}/>
                <a  onClick={() => this.props.handleFullResolutionDisplay()}
                    className="fa fa-close fa-2x close-menu-cross"></a>
            </div>
        )
    }
}

ImageFullScreen.propTypes = {
    image: PropTypes.string.isRequired,
    handleFullResolutionDisplay: PropTypes.func.isRequired,
}

export default ImageFullScreen