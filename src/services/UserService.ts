import { ApiResponse } from "../types/RegisterUserRequest"
import { Address, AddressRequest, PasswordDto, UpdateDetailsDto, UpdateEmailDto, UserInfo } from "../types/UserResponse"
import { PrivateApiClient, PublicApiClient } from "./apiClient"

export const getCurrentUser = async () => {
    const response = await PrivateApiClient.get<ApiResponse<UserInfo>>("/api/v1/users/current-user")
    return response.data
}

export const updateUser = async (userId: number, data: UserInfo) => {
    const response = await PrivateApiClient.put<ApiResponse<null>>(`/api/v1/users/${userId}`, data)
    return response.data
}

export const updateUserDetails = async (data: { userId: number, updateDetailsDto: UpdateDetailsDto }) => {
    const response = await PrivateApiClient.put<ApiResponse<null>>(`/api/v1/users/${data.userId}/user-details`, data.updateDetailsDto)
    return response.data
}

export const updateUserEmail = async (data: UpdateEmailDto) => {
    const response = await PrivateApiClient.put<ApiResponse<null>>(`/api/v1/users/${data.userId}/email`, { "email": data.email })
    return response.data
}

export const sendOtp = async (emailId: string) => {
    const response = await PublicApiClient.post<ApiResponse<null>>(`/api/v1/auth/update/send-otp?username=${emailId}`)
    return response.data
}

export const resetPasswordAfterForget = async (data: { emailId: string, passwordData: PasswordDto }) => {
    const response = await PublicApiClient.post<ApiResponse<null>>(`/api/v1/auth/reset-pass?emailId=${data.emailId}`, data.passwordData)
    return response.data
}

export const resetPassword = async (passwordData: PasswordDto) => {
    const response = await PrivateApiClient.post<ApiResponse<null>>(`/api/v1/users/reset-password`, passwordData)
    return response.data
}

// user address related API calls
export const addAddress = async (data: { userId: number, addressRequest: AddressRequest }) => {
    const response = await PrivateApiClient.post<ApiResponse<Address>>(`/api/v1/user/${data.userId}/address`, data.addressRequest)
    return response.data
}

export const getAddresses = async (userId: number) => {
    const response = await PrivateApiClient.get<ApiResponse<Address[]>>(`/api/v1/address/user/${userId}`)
    return response.data
}

export const getSingleAddress = async (userId: number, addId: number) => {
    const response = await PrivateApiClient.get<ApiResponse<Address>>(`/api/v1/user/${userId}/address/${addId}`)
    return response.data
}

export const updateAddress = async (addId: number, addressData: AddressRequest) => {
    const response = await PrivateApiClient.put<ApiResponse<Address>>(`/api/v1/address/${addId}`, addressData)
    return response.data
}

export const deleteAddress = async (addId: number) => {
    const response = await PrivateApiClient.delete<ApiResponse<null>>(`/api/v1/address/${addId}`)
    return response.data
}