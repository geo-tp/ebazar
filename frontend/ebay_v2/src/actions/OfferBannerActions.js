import {GET_OFFER_BANNER, GET_OFFER_BANNER_ERROR, GET_OFFER_BANNER_SUCCESS} from "../constants/OfferBannerConstants"

export const getOfferBanner = () => ({
    type: GET_OFFER_BANNER,
    payload: {}
})

export const getOfferBannerError = (error) => ({
    type: GET_OFFER_BANNER_ERROR,
    payload: {}
})

export const getOfferBannerSuccess = (offerBanners) => ({
    type : GET_OFFER_BANNER_SUCCESS,
    payload: {offerBanners:offerBanners}
})