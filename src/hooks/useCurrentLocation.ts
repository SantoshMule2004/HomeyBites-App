import { useState, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useQuery } from '@tanstack/react-query';
import { reverseGeocoding } from '../services/LocationIQService';

interface Coordinates {
    lat: number;
    lon: number;
}

export function useCurrentLocation() {
    const [coords, setCoords] = useState<Coordinates | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [isLocatingHardware, setIsLocatingHardware] = useState<boolean>(false);

    const requestPermissions = async (): Promise<boolean> => {
        if (Platform.OS === 'ios') {
            const status = await Geolocation.requestAuthorization('whenInUse');
            return status === 'granted';
        }
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return false;
    };

    const acquireCoordinates = useCallback(async () => {
        setIsLocatingHardware(true);
        setGeoError(null);

        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            setGeoError('Location permission denied.');
            setIsLocatingHardware(false);
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setIsLocatingHardware(false);
            },
            (error) => {
                console.error('GPS Hardware Error:', error);
                setGeoError('Failed to capture GPS lock.');
                setIsLocatingHardware(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const {
        data: geocodeData,
        isLoading: isQueryLoading,
        error: queryError,
        refetch: refetchGeocode,
    } = useQuery({
        queryKey: ['reverseGeocode', coords?.lat, coords?.lon],
        queryFn: () => reverseGeocoding(coords!.lat, coords!.lon),
        enabled: !!coords,
        staleTime: 1000 * 60 * 5,
    });

    const refresh = useCallback(async () => {
        await acquireCoordinates();
    }, [acquireCoordinates]);

    let addressDisplay = 'Ready to locate';
    if (isLocatingHardware) addressDisplay = 'Locking GPS satellites...';
    else if (isQueryLoading) addressDisplay = 'Resolving address...';
    else if (geocodeData?.address) {
        const addr = geocodeData.address;
        addressDisplay = `${addr.suburb || addr.neighbourhood || addr.road || 'Unknown location'}`;
    }

    return {
        coords,
        displayAdd: addressDisplay,
        address: geocodeData?.display_name,
        loading: isLocatingHardware || isQueryLoading,
        error: geoError || (queryError ? 'API error resolving address' : null),
        refreshLocation: refresh,
    };
}