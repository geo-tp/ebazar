import { CREATE_OPERATION, CREATE_OPERATION_ERROR, CREATE_OPERATION_SUCCESS, 
         GET_OPERATIONS, GET_OPERATIONS_ERROR, GET_OPERATIONS_SUCCESS } from "../constants/OperationConstants";

export const getOperations = (userId) => ({
    type: GET_OPERATIONS,
    payload: {userId:userId}
})

export const getOperationsError = (error) => ({
    type: GET_OPERATIONS_ERROR,
    payload: {error:error}
})

export const getOperationsSuccess = (operations) => ({
    type: GET_OPERATIONS_SUCCESS,
    payload: {operations:operations}
})

export const createOperation = (operation) => ({
    type: CREATE_OPERATION,
    payload: {operation:operation}
})

export const createOperationError = (error) => ({
    type: CREATE_OPERATION_ERROR,
    payload: {error:error}
})

export const createOperationSuccess = (operation) => ({
    type: CREATE_OPERATION_SUCCESS,
    payload: {operation:operation}
})

