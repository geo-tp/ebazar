import { getBidsOfObject, getBidsOfObjectError, getBidsOfObjectSuccess } from "../actions/BidActions";
import { parametersFormater } from "../utils/parametersFormater";
import { urlFormater } from "../utils/urlFormater";
import {NOT_FOUND} from "../utils/errors"
import { API_BID } from "../utils/apiEndPoints";


export const fetchBidsOfObject = (objectId) => {
    return (dispatch) => {
        dispatch(getBidsOfObject(objectId))

        let url = urlFormater({
            model: API_BID,
            filter_field: "obj",
            filter_value: objectId,
            ordering: "-price"
        })


        let params = parametersFormater("GET")

        return fetch(url, params)
                .then(rslt => {
                    if (!rslt.ok) {
                        throw new Error(NOT_FOUND)
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