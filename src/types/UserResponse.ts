export interface UserResponse {
    status: string,
    message: string,
    token: string,
    user: UserInfo
}

export interface UserInfo {
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    emailId: string;
    isVerified: boolean;
    phoneNo: string;
    dob: string;
    gender: string;
    dietryPref: string;
    userRole: string;
    businessName: string;
    foodLicenseNo: string;
    GSTIN: string;

    latitude: number;
    longitude: number;
    serviceRadius: string;
}

export interface UpdateDetailsDto {
    firstName: string;
    lastName: string;
}

export interface UpdateEmailDto {
    userId: number,
    email: string
}

export interface PasswordDto {
    oldPassword: string;
    newPassword: string;
    cPassword: string;
}

export interface AddressRequest {
    addressLine: string;
    area: string;
    latitude: string;
    longitude: string;
    receiverName: string;
    receiverContactNo: string;
    addressType: string;
    addressName: string;
}

export interface Address {
    addId: number;
    addressLine: string;
    area: string;
    latitude: string;
    longitude: string;
    receiverName: string;
    receiverContactNo: string;
    addressType: string;
    addressName: string;
}

export interface CartItem {
    cartItemId: number;
    cartId: number;
    quantity: number;
    priceWhenAdded: number;
    currentPrice: number;
    isPriceChanged: boolean;

    menuItemId: number;
    menuName: string;
    price: number;
    description: string;
    count: number;
    isActive: boolean;
    menuType: string;
    imagePublicId: string;
    imageUrl: string;
    format: string;
    categoryId: number;
    providerId: number;
    businessName: string;
}

export interface CartDto {
    cartItems: CartItem[],
    grandTotal: number
}