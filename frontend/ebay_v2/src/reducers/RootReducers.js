import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { BidReducer } from "./BidReducer";
import { CategoryReducer } from "./CategoryReducer";
import { detailledObjectReducer } from "./DetailledObjectReducer";
import { MessageReducer } from "./MessageReducer";
import { QuestionOfObjectReducer } from "./QuestionOfObjectReducer"
import { ObjectReducer } from "./ObjectReducer";
import { OfferBannerReducer } from "./OfferBannerReducer";
import { SubCategoryReducer } from "./SubCategoryReducer";
import { ImageReducer } from "./ImageReducer"
import { ReceivedQuestionReducer } from "./ReceivedQuestionReducer";
import { SelectionReducer } from "./SelectionReducer";

export function initState() {
    
    const storeFields = ["auth", "questions", "messages", 
                         "objects", "offerBanners", "categories", "subCategories", 
                         "detailledObject", "detailledObjectBids", "detailledObjectQuestions", 
                         "detailledObjectImages",
                         "states", "operations", "durations", "selections" ]

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
                    cookieAccept: false,

                    userInfos: {}
                }
                break

            case "messages":

                store[field] = {

                    loading: false,
                    error: false,
                    connected: false,

                    sended_messages : {},
                    received_messages : {}
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
        auth: AuthReducer(state.auth, action),
        messages: MessageReducer(state.messages, action),
        questions: ReceivedQuestionReducer(state.questions, action),

        objects: ObjectReducer(state.objects, action),
        
        detailledObject: detailledObjectReducer(state.detailledObject, action),
        detailledObjectBids: BidReducer(state.detailledObjectBids, action),
        detailledObjectImages: ImageReducer(state.detailledObjectImages, action),
        detailledObjectQuestions: QuestionOfObjectReducer(state.detailledObjectQuestions, action),
        
        
        offerBanners: OfferBannerReducer(state.offerBanners, action),
        selections: SelectionReducer(state.selections, action),
        categories: CategoryReducer(state.categories, action),
        subCategories: SubCategoryReducer(state.subCategories, action),

    }
}
