import { useUserPrefStore } from "./useUserPrefStore";

export function useAppTheme() {
    return useUserPrefStore((state) => state.activeUserPref)
}