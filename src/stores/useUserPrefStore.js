import { create } from "zustand";
import { mmkvStorage } from "../data/mmkvStorage";
import { Appearance } from "react-native";


export const useUserPrefStore = create((set, get) => ({
    userPref: mmkvStorage.getUserPreference() || "system",

    activeUserPref: !mmkvStorage.getUserPreference() ? Appearance.getColorScheme() : (mmkvStorage.getUserPreference() === 'system' ? Appearance.getColorScheme() : mmkvStorage.getUserPreference()),

    setUserPref: (preference) => {
        mmkvStorage.setUserPreference(preference)

        set({
            userPref: preference,
            activeUserPref: preference === 'system' ? Appearance.getColorScheme() : preference
        })
    },

    updateSystemPref: (systemPreference) => {
        if (get().userPref === 'system') {
            set({ activeUserPref: systemPreference })
        }
    }
}))