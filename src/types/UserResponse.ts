export interface UserResponse {
    status: string,
    message: string,
    token: string,
    user: User
}

export interface User {
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    emailId: string;
    phoneNo: string;
    dob: string;
    gender: string;
    dietryPref: string;
    userRole: string;
}