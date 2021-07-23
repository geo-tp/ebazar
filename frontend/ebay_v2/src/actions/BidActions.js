import { GET_BIDS_OF_OBJECT, GET_BIDS_OF_OBJECT_ERROR, GET_BIDS_OF_OBJECT_SUCCESS,
         CREATE_BID_ERROR, CREATE_BID_SUCCESS, CREATE_BID} from "../constants/BidConstants";

export const getBidsOfObject = (objectId) => ({
    type: GET_BIDS_OF_OBJECT,
    payload: {objectId: objectId}
})

export const getBidsOfObjectError = (error) => ({
    type: GET_BIDS_OF_OBJECT_ERROR,
    payload: {error: error}
})

export const getBidsOfObjectSuccess = (bids) => ({
    type: GET_BIDS_OF_OBJECT_SUCCESS,
    payload: {bids:bids}
})

export const createBid = (price, userId, objectId) => ({
    type: CREATE_BID,
    payload: {price: price, userId:userId, objectId:objectId}
})

export const createBidError = (error) => ({
    type: CREATE_BID_ERROR,
    payload: {error:error}
})

export const createBidSuccess = (bid) => ({
    type: CREATE_BID_SUCCESS,
    payload: {bid:bid}
})