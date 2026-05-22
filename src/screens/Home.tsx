import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import ThemedText from '../components/ThemedText'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useNavigation } from '@react-navigation/native'
import CustomCarousel from '../components/CustomCarousel'
import MenuItemList from '../components/MenuItemList'
import Heading from '../components/Heading'
import Spacer from '../components/Spacer'
import { DATA } from '../types/Type'

type navigationProp = NativeStackNavigationProp<RootStackParamList>

const data = [
    { id: '1', title: 'Slide 1', color: '#FF6B6B' },
    { id: '2', title: 'Slide 2', color: '#4ECDC4' },
    { id: '3', title: 'Slide 3', color: '#45B7D1' },
];

const Home = () => {
    const navigation = useNavigation<navigationProp>()

    const onSearch = (query: string) => {
        console.log("query: ", query)
        Alert.alert("Query", query)
    }

    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText style={styles.titleText}>App Name</ThemedText>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} >
                    <ThemedSearchBar editable={false} placeholder='search' onSearch={onSearch} />
                </TouchableOpacity>
            </ThemedView>

            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomCarousel data={data} />

                <Spacer height={20} />

                <Heading title='Breakfast options' onClick={() => Alert.alert("Breakfast options")} />
                <Spacer height={5} />

                <MenuItemList data={DATA} />

                <Spacer height={20} />

                <Heading title='Lunch options' onClick={() => Alert.alert("Lunch options")}/>

                <Spacer height={5} />

                <MenuItemList data={DATA} />
            </ScrollView>
        </ThemedView>
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
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    titleText: {
        fontSize: 24,
        padding: 10,
        fontWeight: '600'
    }
})