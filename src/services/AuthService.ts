import { ApiResponse, RegisterUserRequest, VerifyOtpData } from "../types/RegisterUserRequest"
import { UserLoginRequest } from "../types/UserLoginRequest"
import { UserResponse, } from "../types/UserResponse"
import { PublicApiClient } from "./apiClient"

export const login = async (data: UserLoginRequest) => {
    console.log("Data - ", data)
    const response = await PublicApiClient.post<UserResponse>("/api/v1/auth/login", data)
    return response.data
}

export const register = async (data: RegisterUserRequest) => {
    console.log("Data - ", data)
    const response = await PublicApiClient.post<ApiResponse<null>>("/api/v1/auth/register", data)
    return response.data
}

// send-otp at register
export const sendOtptoVerifyEmail = async (emailId: string) => {
    const response = await PublicApiClient.post<ApiResponse<null>>(`/api/v1/auth/send-otp?username=${emailId}`)
    return response.data
}

// verify-otp register
export const verifyOtpOnServer = async (data: VerifyOtpData) => {
    const response = await PublicApiClient.post<ApiResponse<null>>(`/api/v1/auth/verify-otp?otp=${data.otp}&username=${data.emailId}`)
    return response.data
}