export interface RegisterUserRequest {
    firstName: string;
    middleName: string;
    lastName: string;
    emailId: string;
    verified: boolean;
    phoneNo: string;
    password: string;
    cPassword: string;
}

export interface ApiResponse<Type> {
    message: string;
    success: boolean;
    classObj: Type;
}

export interface VerifyOtpData {
    otp: string,
    emailId: string
}