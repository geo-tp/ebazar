import { GET_SUB_CATEGORIES, GET_SUB_CATEGORIES_ERROR, GET_SUB_CATEGORIES_SUCCESS } from "../constants/SubCategoryConstants";

export const getSubCategories = (categoryId) => ({
    type: GET_SUB_CATEGORIES,
    payload: {categoryId: categoryId}
})

export const getSubCategoriesError = (error) => ({
    type: GET_SUB_CATEGORIES_ERROR,
    payload: {error:error}
})

export const getSubCategoriesSuccess = (subCategories) => ({
    type: GET_SUB_CATEGORIES_SUCCESS,
    payload: {subCategories: subCategories}
})
