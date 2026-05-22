import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: 'data-storage' })

const USER_PREF = "userPreference"

export const mmkvStorage = {
    // user theme preference
    getUserPreference: () => {
        const pref = storage.getString(USER_PREF)
        return pref ? pref : null
    },

    setUserPreference: (preference: string) => {
        storage.set(USER_PREF, preference)
    },
}