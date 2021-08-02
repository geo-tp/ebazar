import { AuthReducer } from "./AuthReducer";
import { BidReducer } from "./BidReducer";
import { CategoryReducer } from "./CategoryReducer";
import { detailledObjectReducer } from "./DetailledObjectReducer";
import { SendedMessageReducer, ReceivedMessageReducer } from "./MessageReducer";
import { QuestionReducer, QuestionOfObjectReducer } from "./QuestionReducer"
import { ObjectReducer } from "./ObjectReducer";
import { OfferBannerReducer } from "./OfferBannerReducer";
import { SubCategoryReducer } from "./SubCategoryReducer";
import { ImageReducer } from "./ImageReducer"
import { SelectionReducer } from "./SelectionReducer";
import { UserReducer } from "./UserReducer";

export function initState() {
    
    const storeFields = ["auth", 
                         "user", "questions", "sendedMessages", "receivedMessages", 
                         "objects", 
                         "detailledObject", "detailledObjectBids", "detailledObjectQuestions", "detailledObjectImages",
                         "offerBanners", "categories", "subCategories", 
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
                    
                    token: null,
                    basicUser: {}
                }
                break

            case "user":

                store[field] = {

                    loading: false,
                    error: false, 
                    loaded: false,
                    
                    user: {}
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

        user: UserReducer(state.user, action),
        sendedMessages: SendedMessageReducer(state.sendedMessages, action),
        receivedMessages: ReceivedMessageReducer(state.receivedMessages, action),
        questions: QuestionReducer(state.questions, action),

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
