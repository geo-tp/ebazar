import { GET_OFFER_BANNER, GET_OFFER_BANNER_ERROR, GET_OFFER_BANNER_SUCCESS } from "../constants/OfferBannerConstants";
import { initialState } from "./RootReducers";


export const OfferBannerReducer = (state=initialState.offerBanners, action) => {

    switch(action.type) {
        case GET_OFFER_BANNER:
            return {...state, loading: true}

        case GET_OFFER_BANNER_ERROR:
            return {...state, loading:false, error: action.payload.error}

        case GET_OFFER_BANNER_SUCCESS:
            return {...state, loading: false, loaded: true, 
                       items: action.payload.offerBanners}

        default:
            return state
    }
}