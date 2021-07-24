import { GET_BIDS_OF_OBJECT, GET_BIDS_OF_OBJECT_ERROR, GET_BIDS_OF_OBJECT_SUCCESS } from "../constants/BidConstants";
import { initialState } from "./RootReducers";


export const BidReducer = (state=initialState.detailledObjectBids, action) => {

    switch (action.type) {
        
        case GET_BIDS_OF_OBJECT:
            return {...state, loading:true}

        case GET_BIDS_OF_OBJECT_ERROR:
            return {...state, loading: false, error:action.payload.error}

        case GET_BIDS_OF_OBJECT_SUCCESS:
            return {...state, loading: false, loaded: true, items:action.payload.bids}

        default:
            return state
    }
}