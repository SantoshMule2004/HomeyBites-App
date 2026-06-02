import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import ThemedText from './ThemedText'

const MenuItemList = ({ data, onItemClicked }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const renderItem = ({ item }) => (
        <Pressable onPress={() => onItemClicked(item.id)}>
            <View style={[styles.itemContainer, { backgroundColor: theme.uiBackground }]}>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri: item.url
                    }}
                    resizeMode='cover' />

                <ThemedText numberOfLines={1} style={styles.title}>{item.title}</ThemedText>
            </View>
        </Pressable>
    );

    const EmptyMenu = () => {
        return <View style={[{ alignItems: 'center', justifyContent: 'center', padding: 20 }]}>
            <ThemedText style={{ fontWeight: '300', fontSize: 15 }}>Currently no items available</ThemedText>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={EmptyMenu}
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
        marginHorizontal: 5,
        paddingBottom: 5,
        borderRadius: 20,
        width: 120
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 5
    },
    cardImage: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardDesc: {
        flex: 1,
        paddingHorizontal: 10
    }
})