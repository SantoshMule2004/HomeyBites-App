import { ApiResponse } from "../types/RegisterUserRequest"
import { CartItem } from "../types/UserResponse"
import { PrivateApiClient } from "./apiClient"

// this will be updated
export const getCartItems = async (userId: number) => {
    const response = await PrivateApiClient.get<ApiResponse<CartItem[]>>(`/api/v1/cart/${userId}`)
    return response.data
}

export const addItemToCart = async (userId: number, itemId: number) => {
    const response = await PrivateApiClient.post<ApiResponse<null>>(`/api/v1/cart/${userId}/item/${itemId}`)
    return response.data
}

export const updateCartItem = async (cartItemId: number, quantity: number) => {
    const response = await PrivateApiClient.put<ApiResponse<null>>(`/api/v1/cart/${cartItemId}/quantity/${quantity}`)
    return response.data
}

export const deleteCartItem = async (cartItemId: number) => {
    const response = await PrivateApiClient.delete<ApiResponse<null>>(`/api/v1/cart/delete/${cartItemId}`)
    return response.data
}

export const deleteCart = async (userId: number) => {
    const response = await PrivateApiClient.delete<ApiResponse<null>>(`/api/v1/cart/${userId}`)
    return response.data
}