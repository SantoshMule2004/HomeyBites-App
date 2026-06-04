import { Category, MenuItem } from "../types/MenuResponse"
import { PublicApiClient } from "./apiClient"

export const updateAddress = async () => {
    const response = await PublicApiClient.get<Category[]>(`/api/v1/category`)
    return response.data
}

export const getAllCategory = async (cId: number) => {
    const response = await PublicApiClient.get<Category>(`/api/v1/category/public/${cId}`)
    return response.data
}

export const getMenuitemsNearbyUser = async (data: { userLat: number, userLng: number }) => {
    const response = await PublicApiClient.get<MenuItem[]>(`/api/v1/public/menuitem-nearby?lat=${data.userLat}&lng=${data.userLng}`)
    return response.data
}

export const getMenuitemById = async (data: { menuId: number, userLat: number, userLng: number }) => {
    const response = await PublicApiClient.get<MenuItem>(`/api/v1/public/menuitem/${data.menuId}?lat=${data.userLat}&lng=${data.userLng}`)
    return response.data
}