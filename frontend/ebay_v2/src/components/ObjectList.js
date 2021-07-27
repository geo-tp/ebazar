import { Component } from "react";
import Obj from "./Object"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { objectSelector } from "../selectors/ObjectSelectors";
import { fetchNextObjectsPage } from "../thunks/ObjectThunk";

class ObjectList extends Component {



    render = () => {

        return(
            <div id="main-object-list">
                    <h4>{this.props.listLabel}</h4>
                    <div id="main-object-list__wrapper" >
                        {/* {this.props.objects.loaded && 
                        this.props.objects.items != {} && 
                        this.props.objects.items.results.map(object => {
                            return <Obj object={object}/>
                        })} */}
                    </div>
                    {/* {this.props.objects.items.results.length == 0 && <p style={{"text-align": "center"}}>Aucune enchère pour le moment</p>} */}
                    <div className="main-object-list__container">
                        {this.props.objects.items.next && 
                        <a 
                            className="main-object-list__container__next-button" 
                            onClick={e => this.fetchNextObjectsPage(this.props.objects.items.next)}>
                            View More
                        </a>}
                    </div>
                    
            </div>
        )
    }
}

const ObjectListStore = connect (
    (state) => ({
        objects: objectSelector(state)
    }),
    (dispatch) => ({
        fetchNextObjectsPage: (url) => dispatch(fetchNextObjectsPage(url))
    })
)(ObjectList)


ObjectList.propTypes = {
    objects: PropTypes.object.isRequired,
    listLabel: PropTypes.string.isRequired,
}


export default ObjectListStore