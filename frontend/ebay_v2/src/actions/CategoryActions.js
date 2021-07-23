import { GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS } from "../constants/CategoryConstants"

export const getCategories = () => ({
    type: GET_CATEGORIES,
    payload: {}
})

export const getCategoriesError = (error) => ({
    type: GET_CATEGORIES_ERROR,
    payload: {error:error}
})

export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: {categories:categories}
})