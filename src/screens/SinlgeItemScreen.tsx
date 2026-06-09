import { Alert, Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMenuitemById } from '../services/MenuService';

import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer';
import ThemedButton from '../components/ThemedButton';
import ThemedText from '../components/ThemedText';
import IonIcons from '../components/IonIcons';
import ThemedSearchBar from '../components/ThemedSearchBar';
import LoadingContainer from '../components/LoadingContainer';
import { useUserStore } from '../stores/useUserStore';
import { addItemToCart, getCartItemsCount } from '../services/CartService';
import axios from 'axios';

type SingleItemProps = NativeStackScreenProps<RootStackParamList, 'SingleItem'>;

const SinlgeItemScreen = ({ route, navigation }: SingleItemProps) => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const insets = useSafeAreaInsets()

    const HEADER_HEIGHT = 70
    const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

    const isLoggedIn = useUserStore((state) => state.isLoggedIn)
    const userId = useUserStore((state) => state.userId)

    const id = route.params.itemId

    // const item = rawData.filter((item) => item.id === id)

    const onSearch = (query: string) => {
        Alert.alert("onSearch")
    }

    const addToCart = () => {
        if (!isLoggedIn) {
            Alert.alert("Please, log in first")
            return
        }

        addToCartMutation.mutate({ userId, itemId: data?.menuId! })
    }

    const { data: cartItemCount, isPending: cartItemCountPending, refetch: cartItemCountRefetch } = useQuery({
        queryKey: ['cart-items-count', isLoggedIn],
        queryFn: () => getCartItemsCount(userId),
        enabled: isLoggedIn,
        // staleTime: 1000 * 60 * 5,
    });

    const { data, isPending, isFetching, error, refetch, } = useQuery({
        queryKey: ['menuitem-single', id],
        queryFn: () => getMenuitemById({ menuId: Number(id), userLat: route.params.userLat, userLng: route.params.userLng }),
        enabled: true,
        // staleTime: 1000 * 60 * 5,
    });

    const addToCartMutation = useMutation({
        mutationFn: addItemToCart,
        onSuccess: async (data) => {
            Alert.alert(data.message)
            cartItemCountRefetch()
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const backendMessage = error.response?.data?.message;
                console.log("Backend Message:", backendMessage);
                Alert.alert(backendMessage)
            } else {
                console.log("Generic Error:", error.message);
            }
        }
    })

    const scrollY = useRef(new Animated.Value(0)).current;

    const diffClamp = Animated.diffClamp(scrollY, 0, TOTAL_HEADER_HEIGHT);

    const translateY = diffClamp.interpolate({
        inputRange: [0, TOTAL_HEADER_HEIGHT],
        outputRange: [0, -TOTAL_HEADER_HEIGHT],
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;

        if (y < 0) return;

        scrollY.setValue(y);
    };

    return (
        <ThemedView safe={true} style={styles.container}>
            <Animated.View
                style={[
                    styles.headerContainer,
                    { backgroundColor: theme.background, height: TOTAL_HEADER_HEIGHT, paddingTop: insets.top, transform: [{ translateY: translateY }] }
                ]}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <IonIcons name="arrow-back" style={{ backgroundColor: 'transparent', borderRadius: 0 }} size={24} />
                </TouchableOpacity>

                <ThemedSearchBar placeholder='search' onSearch={onSearch} style={{ width: '70%', marginHorizontal: 10 }} />

                {cartItemCount && <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('BottomTabs', { screen: 'Cart' })}>
                    <IonIcons name={cartItemCount > 0 ? "cart" : "cart-outline"} style={{ backgroundColor: 'transparent', borderRadius: 0 }} size={24} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {cartItemCount > 99 ? '99+' : cartItemCount}
                        </Text>
                    </View>
                </TouchableOpacity>}
            </Animated.View>

            {isPending ? <LoadingContainer style={{ justifyContent: 'center', aliginItems: 'center' }} /> :
                <Animated.ScrollView
                    style={[styles.itemContainer]}
                    contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 20 }}
                    onScroll={
                        onScroll
                        //     Animated.event(
                        //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        //     { useNativeDriver: true }
                        // )
                    }
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}>
                    <Image
                        style={styles.cardImage}
                        source={{
                            uri: data?.imageUrl
                        }}
                        resizeMode='cover' />

                    <View style={styles.itemDesc}>
                        <ThemedText style={[styles.title, { color: theme.title }]}>{data?.menuName}</ThemedText>
                        <Spacer height={5} />
                        <ThemedText style={[styles.title, { color: theme.title }, { fontSize: 15 }]}>{data?.businessName}</ThemedText>
                        <Spacer height={5} />
                        <ThemedText style={[styles.text, { color: theme.text }]}>{data?.description}</ThemedText>
                        <Spacer height={10} />
                        <ThemedText style={[styles.text, { color: theme.text, fontWeight: '700' }]}>₹{data?.price}</ThemedText>
                        <Spacer height={20} />
                        {/* <ThemedText style={[styles.title, { color: theme.title }]}>Delivery Details</ThemedText>
                        <Spacer height={10} /> */}
                    </View>
                </Animated.ScrollView>}

            <View style={styles.btns}>
                <ThemedButton style={{ flex: 1, borderRadius: 20, }} disabled={addToCartMutation.isPending} onPress={addToCart}>
                    <ThemedText btnText={true} style={{ textAlign: 'center' }}>{addToCartMutation.isPending ? "Loading..." : "Add to cart"}</ThemedText>
                </ThemedButton>

                {/* <ThemedButton style={{ flex: 1, borderRadius: 20 }}>
                    <ThemedText btnText={true} style={{ textAlign: 'center' }}>Buy now</ThemedText>
                </ThemedButton> */}
            </View>
        </ThemedView>
    )
}

export default SinlgeItemScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    text: {
        fontSize: 15,
    },
    cardImage: {
        width: 'auto',
        height: 400
    },
    itemDesc: {
        padding: 10
    },
    btns: {
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 5,
    },

    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    iconButton: {
        padding: 8,
    },
    icon: {
        fontSize: 20,
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#E11D48',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    }
})