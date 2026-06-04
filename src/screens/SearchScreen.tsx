import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { navigationProp } from '../navigation/AppNavigator'
import { useQuery } from '@tanstack/react-query'
import { getMenuitemsNearbyUser } from '../services/MenuService'
import { useCurrentLocation } from '../hooks/useCurrentLocation'

import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import LoadingContainer from '../components/LoadingContainer'
import ItemList from '../components/ItemList'

const SearchScreen = () => {
    const navigation = useNavigation<navigationProp>()

    // const [data, setData] = useState<dataType[]>()

    const { coords, displayAdd, address, loading, error: useLocationError, refreshLocation } = useCurrentLocation();
    useEffect(() => {
        refreshLocation();
    }, [refreshLocation]);

    const onSearch = (query: string) => {
        // if (query.length == 0) {
        //     setData(rawData)
        // }
        // else {
        //     console.log("query: ", query)
        //     const filteredData = rawData.filter((item) => item.title.includes(query))
        //     setData(filteredData)
        // }
    }

    const { data, isPending, isFetching, error, refetch, } = useQuery({
        queryKey: ['nearby-menuitems'],
        queryFn: () => getMenuitemsNearbyUser({ userLat: coords?.lat!, userLng: coords?.lon! }),
        enabled: !!coords,
        staleTime: 1000 * 60 * 5,
    });

    const onItemClicked = (id: string) => {
        navigation.navigate('SingleItem', { itemId: id, userLat: coords?.lat!, userLng: coords?.lon! })
    }

    return (
        <ThemedView safe={true} style={styles.container} >
            <ThemedSearchBar placeholder='search' onSearch={onSearch} />
            <View style={{ flex: 1 }}>
                {loading ?
                    <LoadingContainer />
                    :
                    <ItemList data={data} onItemClicked={onItemClicked} />
                }
            </View>
        </ThemedView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})