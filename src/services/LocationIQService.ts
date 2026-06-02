import { LocationIQAutocompleteResult, LocationIQReverseResult } from "../types/Type"
import { PublicApiClient } from "./apiClient"

export const autocomplete = async (query: string) => {
    const response = await PublicApiClient.get<LocationIQAutocompleteResult[]>(`/api/v1/location/autocomplete?query=${query}`)
    return response.data
}

export const reverseGeocoding = async (lat: number, lng: number) => {
    const response = await PublicApiClient.get<LocationIQReverseResult>(`/api/v1/location/reverse-geocoding?latitude=${lat}8&longitude=${lng}`)
    return response.data
}