import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

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

export const mmkvStorageService : StateStorage = {
    getItem: function (name: string): string | null {
        console.log("getting data for key ", name)
        const value = storage.getString(name)
        console.log("value ", value)
        return value ?? null
    },
    setItem: function (name: string, value: string): unknown {
        console.log("setting data for key ", name, ", value: ", value)
        return storage.set(name, value)
    },
    removeItem: function (name: string): unknown {
        console.log("removing data for key ", name)
        throw storage.remove(name)
    }
}