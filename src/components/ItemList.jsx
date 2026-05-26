import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'
import ThemedText from './ThemedText'

const ItemList = ({ data, onItemClicked }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const renderItem = ({ item }) => (
        <Pressable onPress={() => onItemClicked(item.id)}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri: item.url
                    }}
                    resizeMode='center' />

                <View style={styles.cardDesc}>
                    <Text style={[styles.title, { color: theme.title }]}>{item.title}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.desc}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.price}</Text>
                </View>
            </View>
        </Pressable>
    );

    const Divider = () => {
        return <View style={[styles.separator, { backgroundColor: theme.uiBackground }]} />
    };

    const EmptyMenu = () => {
        return <View style={[styles.container, { alignItems: 'center', marginTop: 70 }]}>
            <ThemedText style={{ fontWeight: '500', fontSize: 18 }}>No item found</ThemedText>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={Divider}
                ListEmptyComponent={EmptyMenu}
            />
        </View>
    )
}

export default ItemList

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        minHeight: 200,
        marginBottom: 10,
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    text: {
        fontSize: 15,
    },
    cardImage: {
        width: 100,
        height: 150
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