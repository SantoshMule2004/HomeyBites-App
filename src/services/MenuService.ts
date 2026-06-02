import { Category } from "../types/MenuResponse"
import { ApiResponse } from "../types/RegisterUserRequest"
import { PrivateApiClient } from "./apiClient"

export const updateAddress = async () => {
    const response = await PrivateApiClient.get<Category[]>(`/api/v1/category`)
    return response.data
}