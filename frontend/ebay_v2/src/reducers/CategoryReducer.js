
import  {GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS} from "../constants/CategoryConstants"
import {initialState} from "../reducers/RootReducers"

export const CategoryReducer = (state=initialState.categories, action) => {

    switch(action.type) {
        case GET_CATEGORIES:
            return {...state, loading:true}

        case GET_CATEGORIES_ERROR:

            return {...state, loading:false, error: action.payload.error}

        case GET_CATEGORIES_SUCCESS:
            return {...state, loading:false,
                          loaded: true, items: action.payload.categories}
        

        default:
            return state
    }
}