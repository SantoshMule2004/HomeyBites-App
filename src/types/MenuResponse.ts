export interface Category {
    categoryId: number;
    categoryName: string;
    isActive: boolean;
}

export interface MenuItem {
    count: any
    format: string
    imagePublicId: string
    serviceRadius: number
    imageUrl: string
    menuType: string
    businessName: string
    providerId: number
    menuName: string
    categoryId: number
    latitude: number
    longitude: number
    isActive: boolean
    price: number
    menuId: number
    distanceInMeters: number
    description: string
}