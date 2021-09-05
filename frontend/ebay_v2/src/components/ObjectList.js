import { Component } from "react";
import PropTypes from "prop-types"
import Obj from "./Object"
import { NO_OBJECT_TO_RENDER } from "../utils/errors";

class ObjectList extends Component {

    render = () => {

        return(
            <div className="main-object-list">
                    <h4>{this.props.listLabel}</h4>
                    {this.props.objects && this.props.objects.loaded && this.props.objects.items.results.length == 0 && 
                            <h4 className="main-object-list__no-object">{NO_OBJECT_TO_RENDER}</h4>}
                    <div className="main-object-list__wrapper" >
                        {this.props.objects && this.props.objects.loaded && 
                        this.props.objects.items != {} && 
                        this.props.objects.items.results.map(object => {
                            return <Obj object={object}/>
                        })}
                    </div>
                    {/* {this.props.objects.items.results.length == 0 && <p style={{"text-align": "center"}}>Aucune enchère pour le moment</p>} */}
                    <div className="main-object-list__container">
                        {this.props.objects && this.props.objects.items.next && 
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

    listLabel: PropTypes.string,
}

// export const ObjectListContainer = connect(
//     (state) => ({
//         objects: objectSelector(state)
//     }),
//     (dispatch) => ({
//         fetchObjects: (filter) => dispatch(fetchObjects(filter)),
//         fetchNextObjectsPage: (url) => dispatch(fetchNextObjectsPage(url)),
//     })
// )(ObjectList)


export default ObjectList