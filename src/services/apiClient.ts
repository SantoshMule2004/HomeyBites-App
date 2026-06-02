import axios from "axios";
import { mmkvKey } from "../constants/mmkvKeys";
import { useUserStore } from "../stores/useUserStore";

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