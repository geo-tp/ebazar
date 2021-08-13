
import { Component } from "react";
// import "./style.css"
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import AccountObj from "./AccountObj";

class ObjectsAccountListe extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         ObjectsListe : this.props.ObjectsListe
    //     }
    // }


    // handlePaidConfirmation = (index) => {
    //    let objectsListe  = this.state.ObjectsListe
    //    objectsListe[index].isPaid =1

    //    this.setState({
    //        ObjectsListe:objectsListe
    //    })

    // }

    determineButtonToUse() {

        let buttonText = "Tout Voir"

        switch (this.props.objectsType) {
            case "purchasedObjects":
                return(<Link to="/purchased"><button>{buttonText}</button></Link>)
            case 'biddedObjects':
                return(<Link to="/bidded"><button>{buttonText}</button></Link>)
            case 'followedObjects':
                return(<Link to="/affaires"><button>{buttonText}</button></Link>)
            case 'activeObjects':
                return(<Link to="/active"><button>{buttonText}</button></Link>)
            case 'endedbjects':
                return(<Link to="/ended"><button>{buttonText}</button></Link>)
            case 'activeObjects':
                return(<Link to="/active"><button>{buttonText}</button></Link>)
            case 'selledObjects':
                return(<Link to="/selled"><button>{buttonText}</button></Link>)
        }
    }

    render() {
        return(
            <div className="main-account-object-list">
                <div className="main-account-object-list__wrapper">
                    <h3>{this.props.title}</h3>
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

export default ObjectsAccountListe