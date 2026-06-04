import { create } from "zustand";
import { mmkvStorageService } from "../data/mmkvStorage";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    userId: number,
    firstName: string,
    lastName: string,
    emailId: string,
    phoneNo: string,
    dob: string,
    gender: string,
    dietryPref: string,
    userRole: string,
    isLoggedIn: boolean,
    authToken: string,
    login: (userId: number, firstName: string, lastName: string, emailId: string, phoneNo: string, dob: string, gender: string, dietryPref: string, userRole: string, authToken: string) => void,
    logout: () => void,
    updateUserDetails: (firstName: string, lastName: string) => void,
    updateUserEmail: (emailId: string) => void,
}

export const useUserStore = create<UserState>()(persist(
    (set) => ({
        userId: 0,
        firstName: '',
        lastName: '',
        emailId: '',
        phoneNo: '',
        dob: '',
        gender: '',
        dietryPref: '',
        userRole: '',
        authToken: '',
        isLoggedIn: false,
        login: (userId, firstName, lastName, emailId, phoneNo, dob, gender, dietryPref, userRole, authToken) => {
            console.log("userStore-login")
            set({ userId, firstName, lastName, emailId, phoneNo, dob, gender, dietryPref, userRole, authToken, isLoggedIn: true })
        },
        logout: () => set({
            userId: 0,
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNo: '',
            dob: '',
            gender: '',
            dietryPref: '',
            userRole: '',
            authToken: '',
            isLoggedIn: false,
        }),
        updateUserDetails: (firstName, lastName) => {
            set({ firstName: firstName, lastName: lastName })
        },
        updateUserEmail: (emailId) => {
            set({ emailId })
        }
    }),
    {
        name: 'user-storage',
        storage: createJSONStorage(() => mmkvStorageService)
    }
))