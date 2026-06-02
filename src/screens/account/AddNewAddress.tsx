import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '../../hooks/useDebounce'
import { autocompleteAddress } from '../../services/apiClient'
import { LocationIQAutocompleteResult } from '../../types/Type'
import { navigationProp } from '../../navigation/AppNavigator'

import ThemedView from '../../components/ThemedView'
import ThemedSearchBar from '../../components/ThemedSearchBar'
import IonIcons from '../../components/IonIcons'
import ThemedCard from '../../components/ThemedCard'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'


const AddNewAddress = () => {
    const navigation = useNavigation<accountNavigationProp>()
    const appNavigation = useNavigation<navigationProp>()
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const [textInput, setTextInput] = useState("")
    const [data, setData] = useState<LocationIQAutocompleteResult>()

    const onSearch = (query: string) => {
        // Alert.alert(query)
    }

    const handleConfirm = () => {
        if (!data) {
            Alert.alert("Please enter valid address")
            return
        }

        appNavigation.navigate('ConfirmAddress', {
            address: {
                display_name: data?.display_name!,
                display_address: data?.display_address,
                display_place: data?.display_place,
                lat: data?.lat!,
                lon: data?.lon!
            }
        })
    }

    const onItemClicked = (item: LocationIQAutocompleteResult) => {
        setData(item)
    }

    const debouncedQuery = useDebounce(textInput, 400);

    const { data: results = [], isLoading, isFetching, error } = useQuery({
        queryKey: ['locationAutocomplete', debouncedQuery],
        queryFn: () => autocompleteAddress(debouncedQuery),
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
                <ThemedText style={[styles.text, { fontWeight: '500' }]}>{data?.display_place || data?.display_name.split(',')[0]}</ThemedText>
                <ThemedText style={[styles.text, {}]}>{data?.display_address || data?.display_name}</ThemedText>

                <Spacer height={10}/>
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
        margin:10
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