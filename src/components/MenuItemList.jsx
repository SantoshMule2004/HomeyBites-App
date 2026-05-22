import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import ThemedText from './ThemedText'

const MenuItemList = ({ data }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: theme.uiBackground }]}>
            <Image
                style={styles.cardImage}
                source={{
                    uri: 'https://imgs.search.brave.com/X4N2evOQAeDBPpwI5xUaQ7pLXDcN68hKSAJHuSkACHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9vbmxp/bmV0b29scy5jb20v/aW1hZ2VzL2V4YW1w/bGVzLW9ubGluZWlt/YWdldG9vbHMvdHJl/ZS1zdXJyb3VuZGVk/LWJ5LXdhdGVyLXZl/cnRpY2FsLmpwZw'
                }}
                resizeMode='cover' />

            <ThemedText style={styles.title}>{item.title}</ThemedText>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default MenuItemList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        // margin: 5,
        marginHorizontal:5,
        paddingBottom: 5,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    },
    cardImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardDesc: {
        flex: 1,
        paddingHorizontal: 10
    }
})