import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { navigationProp } from '../navigation/AppNavigator'
import { dataType, rawData } from '../types/Type'

import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import ItemList from '../components/ItemList'

const SearchScreen = () => {
    const navigation = useNavigation<navigationProp>()

    const [data, setData] = useState<dataType[]>()

    const onSearch = (query: string) => {
        if (query.length == 0) {
            setData(rawData)
        }
        else {
            console.log("query: ", query)
            const filteredData = rawData.filter((item) => item.title.includes(query))
            setData(filteredData)
        }
    }

    const onItemClicked = (id: string) => {
        navigation.navigate('SingleItem', { itemId: id })
    }

    return (
        <ThemedView safe={true} style={styles.container} >
            <ThemedSearchBar placeholder='search' onSearch={onSearch} />
            <View style={{ flex: 1 }}>
                <ItemList data={data} onItemClicked={onItemClicked} />
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