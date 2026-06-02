import axios from "axios";
import { mmkvKey } from "../constants/mmkvKeys";
import { useUserStore } from "../stores/useUserStore";
import { LocationIQAutocompleteResult } from "../types/Type";

export const PublicApiClient = axios.create({
    baseURL: mmkvKey.PUBLIC_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const PrivateApiClient = axios.create({
    baseURL: mmkvKey.PUBLIC_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

PublicApiClient.interceptors.request.use(async (config) => {
    console.log("Base URL - ", config.baseURL)
    console.log("URL - ", config.url)
    return config
}, (error) => {
    console.log("interceptors.request", error)
    return Promise.reject(error)
})


PrivateApiClient.interceptors.request.use(async (config) => {
    const userState = useUserStore.getState()
    const token = userState.authToken

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    console.log("interceptors.request", error)
    return Promise.reject(error)
})

PrivateApiClient.interceptors.response.use((response) => {
    console.log("interceptors.response", response.status)

    return response
}, (error) => {
    console.log("interceptors.response", error)

    return Promise.reject(error)
})

export const LocationIQClient = axios.create({
    baseURL: 'https://api.locationiq.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const autocompleteAddress = async (query: string) => {
    const response = await LocationIQClient.get<LocationIQAutocompleteResult[]>(`/v1/autocomplete`,
        {
            params: {
                key: 'pk.ab1a66e1233e369fdf0eec4a9a9555d9',
                q: query,
                limit: 5,
                countrycodes: 'in', // e.g., Restrict to India
                dedupe: 1,
            },
        }
    )
    return response.data
}