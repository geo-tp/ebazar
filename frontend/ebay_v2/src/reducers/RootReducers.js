import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { BidReducer } from "./BidReducer";
import { CategoryReducer } from "./CategoryReducer";
import { detailledObjectReducer } from "./DetailledObjectReducer";
import { ObjectReducer } from "./ObjectReducer";
import { OfferBannerReducer } from "./OfferBannerReducer";
import { SubCategoryReducer } from "./SubCategoryReducer";


export function initState() {
    
    const storeFields = ["auth", "objects", "offerBanners", "categories", "subCategories", 
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
                break;

            case "auth":
                    
                store[field] = {

                    loading: false,
                    error: false, 
                    connected: false,

                    userInfos: {}
                }
                break
        
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
        auth: AuthReducer(state.auth, action),
        objects: ObjectReducer(state.objects, action),
        detailledObject: detailledObjectReducer(state.detailledObject, action),
        detailledObjectBids: BidReducer(state.detailledObjectBids, action),
        categories: CategoryReducer(state.categories, action),
        subCategories: SubCategoryReducer(state.subCategories, action),
        offerBanners: OfferBannerReducer(state.offerBanners, action),

    }
}
