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
import { DurationReducer } from "./DurationReducer";
import { StateReducer } from "./StateReducer";
import { ActiveObjectReducer } from "./ActiveObjectReducer";
import { EndedObjectReducer } from "./EndedObjectReducer";
import { FollowedObjectReducer } from "./FollowedObjectReducer";
import { SelledObjectReducer } from "./SelledObjectReducer";
import { PurchasedObjectReducer } from "./PurchasedObjectReducer";
import { BiddedObjectReducer } from "./BiddedObjectReducer";
import { PurchasedTransactionReducer } from "./PurchasedTransactionReducer";
import { SelledTransactionReducer } from "./SelledTransactionReducer";
import { OperationReducer } from "./OperationReducer";
import { BalanceReducer } from "./BalanceReducer";


export function initState() {
    
    const storeFields = ["auth", 
                         "user", "questions", "sendedMessages", "receivedMessages", 
                         "userActiveObjects", "userEndedObjects", "userFollowedObjects",
                         "userPurchasedObjects", "userSelledObjects", "userBiddedObjects",
                         "userOperations", "userBalance",
                         "objects", 
                         "detailledObject", "detailledObjectBids", "detailledObjectQuestions", "detailledObjectImages",
                         "offerBanners", "categories", "subCategories", 
                         "states", "durations", "selections",
                         "userSelledTransactions", "userPurchasedTransactions" ]

    let store = {}
    for (let field of storeFields) {

        switch (field) {

            case "user":
            case "userBalance":
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
        userActiveObjects: ActiveObjectReducer(state.userActiveObjects, action),
        userEndedObjects : EndedObjectReducer(state.userEndedObjects, action),
        userFollowedObjects: FollowedObjectReducer(state.userFollowedObjects, action),
        userPurchasedObjects: PurchasedObjectReducer(state.userPurchasedObjects, action),
        userSelledObjects: SelledObjectReducer(state.userSelledObjects, action),
        userBiddedObjects: BiddedObjectReducer(state.userBiddedObjects, action),

        userPurchasedTransactions: PurchasedTransactionReducer(state.userPurchasedTransactions, action),
        userSelledTransactions: SelledTransactionReducer(state.userSelledTransactions, action),

        userOperations: OperationReducer(state.userOperations, action),
        userBalance: BalanceReducer(state.userBalance, action),

        sendedMessages: SendedMessageReducer(state.sendedMessages, action),
        receivedMessages: ReceivedMessageReducer(state.receivedMessages, action),
        questions: QuestionReducer(state.questions, action),

        objects: ObjectReducer(state.objects, action),
        
        detailledObject: detailledObjectReducer(state.detailledObject, action),
        detailledObjectBids: BidReducer(state.detailledObjectBids, action),
        detailledObjectImages: ImageReducer(state.detailledObjectImages, action),
        detailledObjectQuestions: QuestionOfObjectReducer(state.detailledObjectQuestions, action),

        durations: DurationReducer(state.durations, action),
        states: StateReducer(state.states, action),

        offerBanners: OfferBannerReducer(state.offerBanners, action),
        selections: SelectionReducer(state.selections, action),
        categories: CategoryReducer(state.categories, action),
        subCategories: SubCategoryReducer(state.subCategories, action),

    }
}
