import { create } from "zustand";
import { mmkvStorage } from "../data/mmkvStorage";

export const useUserPrefStore = create((set, get) => ({
    userPref: mmkvStorage.getUserPreference() || "light",

    activeUserPref: !mmkvStorage.getUserPreference() ? "light" : mmkvStorage.getUserPreference(),

    setUserPref: (preference) => {
        mmkvStorage.setUserPreference(preference)
        set({
            userPref: preference,
            activeUserPref: preference
        })
    }
}))