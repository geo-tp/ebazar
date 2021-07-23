import { GET_SUB_CATEGORIES, GET_SUB_CATEGORIES_ERROR, GET_SUB_CATEGORIES_SUCCESS } from "../constants/SubCategoryConstants";
import {initialState} from "../reducers/RootReducers"

export const SubCategoryReducer = (state=initialState.subCategories, action) => {

    switch (action.type) {
        case GET_SUB_CATEGORIES:
           return {...state, loading: true}
    
        case GET_SUB_CATEGORIES_ERROR:
            return({...state, error:action.payload.error, loading: false})

        case GET_SUB_CATEGORIES_SUCCESS:
            return({...state, items: action.payload.subCategories, loading: false, loaded: true})
        default:
            return state
    }
}