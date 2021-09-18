
import { Component } from "react";
// import "./style.css"
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { NO_OBJECT_TO_RENDER } from "../utils/errors";
import AccountObj from "./AccountObj";
import PropTypes from 'prop-types'


class ObjectsAccountListe extends Component {

    determineButtonToUse() {

        let buttonText = "Tout Voir"

        switch (this.props.objectsType) {
            case "purchasedObjects":
                return(<Link to="/purchased"><button>{buttonText}</button></Link>)
            case 'biddedObjects':
                return(<Link to="/choice/bidded"><button>{buttonText}</button></Link>)
            case 'followedObjects':
                return(<Link to="/choice/followed"><button>{buttonText}</button></Link>)
            case 'activeObjects':
                return(<Link to="/choice/active"><button>{buttonText}</button></Link>)
            case 'endedbjects':
                return(<Link to="/choice/ended"><button>{buttonText}</button></Link>)
            case 'activeObjects':
                return(<Link to="/choice/active"><button>{buttonText}</button></Link>)
            case 'selledObjects':
                return(<Link to="/selled"><button>{buttonText}</button></Link>)
        }
    }

    render() {
        return(
            <div className="main-account-object-list">
                <div className="main-account-object-list__wrapper">
                    <h3 className="align-center">{!! !this.props.objects.items.count && NO_OBJECT_TO_RENDER}</h3>
                        <i onClick={() => this.props.handleResetClick()} id="close-object-list" className="fa fa-2x fa-close"/>
                        {this.props.objects.loaded && this.props.objects.items.results.map((object, index) => {
                            if (index > 7) {
                                return
                            }
                            return (<AccountObj object={object} objectsType={this.props.objectsType}/>)
                            
                        })}
                    <div className="main-account-object-list__wrapper__view-more">
                        {this.props.objects.items.count > 8 && this.determineButtonToUse()}
                        
                    </div>
                </div>
            </div>
        )
    }
}

ObjectsAccountListe.propTypes = {
    object: PropTypes.object.isRequired,
    objectsType: PropTypes.string.isRequired,

    handleResetClick: PropTypes.func.isRequired

}

export default ObjectsAccountListe