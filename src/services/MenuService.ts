import { Category, MenuItem } from "../types/MenuResponse"
import { PublicApiClient } from "./apiClient"

export const getAllCategories = async () => {
    const response = await PublicApiClient.get<Category[]>(`/api/v1/category/public`)
    return response.data
}

export const getCategoryById = async (cId: number) => {
    const response = await PublicApiClient.get<Category>(`/api/v1/category/public/${cId}`)
    return response.data
}

export const getMenuitemsNearbyUser = async (data: { userLat: number, userLng: number, platformRadius?: number, categoryId?: number, menuType?: string, maxPrice?: number }) => {
    const params = {
        lat: data.userLat,
        lng: data.userLng,
        platformRadius: data.platformRadius || undefined,
        categoryId: data.categoryId || undefined,
        menuType: data.menuType || undefined,
        maxPrice: data.maxPrice || undefined
    }
    const response = await PublicApiClient.get<MenuItem[]>(`/api/v1/public/menuitem-nearby`, { params: params })
    return response.data
}

export const getMenuitemById = async (data: { menuId: number, userLat: number, userLng: number }) => {
    const response = await PublicApiClient.get<MenuItem>(`/api/v1/public/menuitem/${data.menuId}?lat=${data.userLat}&lng=${data.userLng}`)
    return response.data
}