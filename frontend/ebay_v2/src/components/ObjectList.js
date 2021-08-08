import { Component } from "react";
import Obj from "./Object"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { objectSelector } from "../selectors/ObjectSelectors";
import { fetchNextObjectsPage } from "../thunks/ObjectThunk";


class ObjectList extends Component {

    render = () => {

        return(
            <div className="main-object-list">
                    {this.props.objects.loaded && this.props.objects.items.results.length == 0 && 
                            <h4 className="main-object-list__no-object">Aucune enchère pour le moment.</h4>}
                    <h4>{this.props.listLabel}</h4>
                    <div className="main-object-list__wrapper" >
                        {this.props.objects.loaded && 
                        this.props.objects.items != {} && 
                        this.props.objects.items.results.map(object => {
                            return <Obj object={object}/>
                        })}
                    </div>
                    {/* {this.props.objects.items.results.length == 0 && <p style={{"text-align": "center"}}>Aucune enchère pour le moment</p>} */}
                    <div className="main-object-list__container">
                        {this.props.objects.items.next && 
                        <button 
                            className="main-object-list__container__view-more-button" 
                            onClick={e => this.props.fetchNextObjectsPage(this.props.objects.items.next)}>
                            View More
                        </button>}
                    </div>
                    
            </div>
        )
    }
}

ObjectList.propTypes = {
    objects: PropTypes.object.isRequired,
    fetchNextObjectsPage: PropTypes.func.isRequired,
    listLabel: PropTypes.string.isRequired,
}


export default ObjectList