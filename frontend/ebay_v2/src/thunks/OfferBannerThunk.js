import { getOfferBanner, getOfferBannerError, getOfferBannerSuccess } from "../actions/OfferBannerActions";
import { parametersFormater } from "../utils/parametersFormater";
import { urlFormater } from "../utils/urlFormater";
import {NOT_FOUND} from "../utils/errors"
import { API_OFFER_BANNER } from "../utils/apiEndPoints";


export const fetchOfferBanners = () => {
    return (dispatch) => {
        dispatch(getOfferBanner()) 
        
        let url  = urlFormater({
            model: API_OFFER_BANNER
        })

        let params = parametersFormater('GET')

        return fetch(url, params)
                        .then(rslt => {
                            if (!rslt.ok) {
                                throw new Error(NOT_FOUND)
                            }

                            return rslt.json()
                        })

                        .then((offerBanners) => {
                            dispatch(getOfferBannerSuccess(offerBanners))
                        })

                        .catch((error) => {
                            console.log(error)
                            dispatch(getOfferBannerError(error))
                        })
    }
}