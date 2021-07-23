import { getBidsOfObject, getBidsOfObjectError, getBidsOfObjectSuccess } from "../actions/BidActions";
import { getOfferBannerError } from "../actions/OfferBannerActions";
import { parametersFormater } from "../utils/parametersFormater";
import { urlFormater } from "../utils/urlFormater";

export const fetchBidsOfObject = (objectId) => {
    return (dispatch) => {
        dispatch(getBidsOfObject(objectId))

        let url = urlFormater({
            model: "bid",
            filter_field: "obj",
            filter_value: objectId
        })


        let params = parametersFormater("GET")

        return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error("Error -404 Not Found")
                    }

                    return rslt.json()
                })

                .then((bids) => {
                    dispatch(getBidsOfObjectSuccess(bids))
                })

                .catch(error => {
                    console.log(error)
                    dispatch(getBidsOfObjectError(error))
                })
    }
}