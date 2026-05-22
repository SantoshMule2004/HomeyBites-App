import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../components/ThemedView'
import ThemedSearchBar from '../components/ThemedSearchBar'
import ItemList from '../components/ItemList'

type dataType = {
    id: string,
    title: string,
    desc: string,
    price:string
}

const DATA: dataType[] = [
    { id: '1', title: 'name1', desc: 'desc', price: 'price' },
    { id: '2', title: 'name2', desc: 'desc', price: 'price' },
    { id: '3', title: 'name3', desc: 'desc', price: 'price' },
    { id: '4', title: 'name4', desc: 'desc', price: 'price' },
    { id: '5', title: 'name5', desc: 'desc', price: 'price' },
    { id: '6', title: 'name6', desc: 'desc', price: 'price' },
    { id: '7', title: 'name7', desc: 'desc', price: 'price' },
    { id: '8', title: 'name8', desc: 'desc', price: 'price' },
    { id: '9', title: 'name9', desc: 'desc', price: 'price' },
    { id: '10', title: 'name10', desc: 'desc', price: 'price' },
    { id: '11', title: 'name11', desc: 'desc', price: 'price' },
    { id: '12', title: 'name12', desc: 'desc', price: 'price' },
];

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