import { combineReducers } from "redux";
import { BidReducer } from "./BidReducer";
import { CategoryReducer } from "./CategoryReducer";
import { detailledObjectReducer } from "./DetailledObjectReducer";
import { ObjectReducer } from "./ObjectReducer";
import { OfferBannerReducer } from "./OfferBannerReducer";
import { SubCategoryReducer } from "./SubCategoryReducer";


export function initState() {
    
    const storeFields = ["objects", "offerBanners", "categories", "subCategories", 
                         "detailledObject", "detailledObjectBids"]

    let store = {}
    for (let field of storeFields) {

        switch (field) {

            case "detailledObject":

                store[field] = {
                    loading: false,
                    error: false,
                    loaded: false,

                    item : {},

                }

            case "auth":
                
            store[field] = {

                loading: false,
                error: false, 
                connected: false,

                userInfos: {}
            }
        
            default:                
                store[field] = {
                    
                    loading: false,
                    error: false,
                    loaded: false,
                    
                    items: {}
                }
            }
    }

    return store
}


export const initialState = initState()


export const RootReducer = (state=initialState, action) => {
    return{
        objects: ObjectReducer(state.objects, action),
        detailledObject: detailledObjectReducer(state.detailledObject, action),
        detailledObjectBids: BidReducer(state.detailledObjectBids, action),
        categories: CategoryReducer(state.categories, action),
        subCategories: SubCategoryReducer(state.subCategories, action),
        offerBanners: OfferBannerReducer(state.offerBanners, action),

    }
}
