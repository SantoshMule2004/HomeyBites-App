import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import ItemList from '../components/ItemList'
import { DATA, dataType } from '../types/Type'


const SearchScreen = () => {

    const [data, setData] = useState<dataType[]>()

    const onSearch = (query: string) => {
        console.log("query: ", query)
        Alert.alert("Query", query)
        const filteredData = DATA.filter((item) => item.title.includes(query))
        setData(filteredData)
    }

    return (
        <ThemedView safe={true} style={styles.container} >
            <ThemedSearchBar placeholder='search' onSearch={onSearch} />
            <View style={{ flex: 1 }}>
                <ItemList data={data} />
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