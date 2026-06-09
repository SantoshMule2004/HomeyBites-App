import React, { useEffect } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { navigationProp } from '../navigation/AppNavigator'
import { useNavigation } from '@react-navigation/native'
import { useCurrentLocation } from '../hooks/useCurrentLocation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { getMenuitemsNearbyUser } from '../services/MenuService'

import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import CustomCarousel from '../components/CustomCarousel'
import MenuItemList from '../components/MenuItemList'
import Heading from '../components/Heading'
import Spacer from '../components/Spacer'
import Logo from '../components/Logo'
import ThemedText from '../components/ThemedText'
import IonIcons from '../components/IonIcons'
import LoadingContainer from '../components/LoadingContainer'
import ShowToast from '../components/ShowToast'

const data = [
    { id: '1', title: 'Ghar Ka Khana', subTitle: '"The Taste of Home, Wherever You Are!"', url: require('../assets/header1.jpeg') },
    { id: '2', title: 'Ghar Ka Khana', subTitle: '"The Taste of Home, Wherever You Are!"', url: require('../assets/header1.jpeg') },
];

const Home = () => {
    const navigation = useNavigation<navigationProp>()
    const insets = useSafeAreaInsets()

    const { coords, displayAdd, address, loading, error: useLocationError, refreshLocation } = useCurrentLocation();

    useEffect(() => {
        refreshLocation();
    }, [refreshLocation]);

    const onSearch = (query: string) => {
        console.log("query: ", query)
        Alert.alert("Query", query)
    }

    const { data: breakfastData, isPending: breakfastPending, isFetching: breakfastFetching, error: breakfastError, refetch: refetchBreakfast, } = useQuery({
        queryKey: ['nearby-menuitems-brekfast', coords],
        queryFn: () => getMenuitemsNearbyUser({ userLat: coords?.lat!, userLng: coords?.lon!, menuType: "BREAKFAST" }),
        enabled: !!coords,
        staleTime: 1000 * 60 * 5,
    });

    const { data: lunchData, isPending: lunchPending, isFetching: lunchFetching, error: lunchError, refetch: refetchLunch, } = useQuery({
        queryKey: ['nearby-menuitems-lunch', coords],
        queryFn: () => getMenuitemsNearbyUser({ userLat: coords?.lat!, userLng: coords?.lon!, menuType: "LUNCH" }),
        enabled: !!coords,
        staleTime: 1000 * 60 * 5,
    });

    const onItemClicked = (id: string) => {
        navigation.navigate('SingleItem', { itemId: id, userLat: coords?.lat!, userLng: coords?.lon! })
    }

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <ThemedView style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Logo />
                    {!loading &&
                        <Pressable style={{ width: '25%', marginRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <IonIcons name="chevron-down" style={{ backgroundColor: 'transparent', borderRadius: 0 }} size={18} />
                                <ThemedText numberOfLines={1} style={{ flexShrink: 1 }}>{displayAdd}</ThemedText>
                            </View>
                            <ThemedText numberOfLines={1} style={{ flexShrink: 1, fontSize: 12 }}>{address}</ThemedText>
                        </Pressable>
                    }
                </View>

                <Pressable onPress={() => navigation.navigate('Search')} >
                    <ThemedSearchBar editable={false} placeholder='search' onSearch={onSearch} />
                </Pressable>
            </ThemedView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                <CustomCarousel data={data} />

                <Spacer height={20} />

                <Heading title='Breakfast options' onClick={() => Alert.alert("Breakfast options")} />
                <Spacer height={5} />
                {breakfastPending ? <LoadingContainer style={{ height: 130, marginTop: 0, justifyContent: 'center', aliginItems: 'center' }} /> : <MenuItemList data={breakfastData} onItemClicked={onItemClicked} />}
                <Spacer height={20} />

                <Heading title='Lunch options' onClick={() => Alert.alert("Lunch options")} />
                <Spacer height={5} />
                {breakfastPending ? <LoadingContainer style={{ height: 130, marginTop: 0, justifyContent: 'center', aliginItems: 'center' }} /> : <MenuItemList data={lunchData} onItemClicked={onItemClicked} />}
            </ScrollView>
        </ThemedView >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    titleText: {
        fontSize: 24,
        padding: 10,
        fontWeight: '600'
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'center'
    }
})