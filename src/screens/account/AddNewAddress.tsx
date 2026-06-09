import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '../../hooks/useDebounce'
import { LocationIQAutocompleteResult } from '../../types/LocationType'
import { navigationProp } from '../../navigation/AppNavigator'
import { autocomplete } from '../../services/LocationIQService'
import { useCurrentLocation } from '../../hooks/useCurrentLocation'

import ThemedView from '../../components/ThemedView'
import ThemedSearchBar from '../../components/ThemedSearchBar'
import IonIcons from '../../components/IonIcons'
import ThemedCard from '../../components/ThemedCard'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ShowToast from '../../components/ShowToast'


const AddNewAddress = () => {
    const navigation = useNavigation<accountNavigationProp>()
    const appNavigation = useNavigation<navigationProp>()
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const { coords, displayAdd, address: fullAddress, loading, error: useLocationError, refreshLocation } = useCurrentLocation();

    useEffect(() => {
        refreshLocation();
    }, [refreshLocation]);

    const [textInput, setTextInput] = useState("")
    const [data, setData] = useState<LocationIQAutocompleteResult>()

    const onSearch = (query: string) => {
        // Alert.alert(query)
    }

    const handleConfirm = () => {
        if (!displayAdd && !data) {
            // Alert.alert("Please enter valid address")
           ShowToast({ text: 'Please enter valid address', success: false, position: 'top', topOffset: 30 })
            return
        }

        if(loading) {
            return
        }
        appNavigation.navigate('ConfirmAddress', {
            address: {
                display_name: data?.display_name! ? data?.display_name! : fullAddress!,
                display_address: data?.display_address ? data?.display_address : fullAddress!.split(',')[1],
                display_place: data?.display_place ? data?.display_place : displayAdd,
                lat: data?.lat! ? data?.lat! : coords?.lat.toString()!,
                lon: data?.lon! ? data?.lon! : coords?.lon.toString()!
            }
        })
    }

    const onItemClicked = (item: LocationIQAutocompleteResult) => {
        setData(item)
    }

    const debouncedQuery = useDebounce(textInput, 400);

    const { data: results = [], isLoading, isFetching, error } = useQuery({
        queryKey: ['locationAutocomplete', debouncedQuery],
        queryFn: () => autocomplete(debouncedQuery),
        enabled: debouncedQuery.length > 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => onItemClicked(item)}>
            <View style={styles.itemContainer}>
                <View style={styles.cardDesc}>
                    <Text style={[styles.title, { color: theme.title }]}>{item.display_place}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.display_address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    const Divider = () => {
        return <View style={[styles.separator, { backgroundColor: theme.borderBottom }]} />
    };

    return (
        <ThemedView safe={true} style={[styles.container, { paddingBottom: Platform.OS === 'android' ? 20 : 0 }]} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, backgroundColor: theme.background }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <IonIcons name="arrow-back" style={{ backgroundColor: 'transparent', borderRadius: 0 }} size={24} />
                </TouchableOpacity>

                <ThemedSearchBar textInput={textInput} setTextInput={setTextInput} placeholder='search an area or address' onSearch={onSearch} style={{ width: '80%', marginHorizontal: 10 }} />
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.place_id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Divider}
                />
            </View>

            <ThemedCard style={styles.card}>
                {loading
                    ?
                    <View style={{ minHeight: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={Colors.primary} size={25} />
                    </View>
                    :
                    <>
                        <ThemedText style={[styles.text, { fontWeight: '500' }]}>{(data?.display_place || data?.display_name.split(',')[1]) || displayAdd}</ThemedText>
                        <ThemedText style={[styles.text, {}]}>{(data?.display_address || data?.display_name) || fullAddress}</ThemedText>
                    </>
                }

                <Spacer height={10} />
                <ThemedButton onPress={handleConfirm}>
                    <ThemedText btnText={true} style={styles.btnText}>Confirm & Proceed</ThemedText>
                </ThemedButton>
            </ThemedCard>
        </ThemedView>
    )
}

export default AddNewAddress

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconButton: {
        padding: 8,
    },
    card: {
        padding: 10,
        margin: 10
    },
    btnText: {
        textAlign: 'center',
    },
    text: {
        textAlign: 'left'
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    cardDesc: {
        flex: 1,
        paddingHorizontal: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 16,
    },
})