import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CapsuleCounter from '../components/CapsuleCounter'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

const CartItem = ({ data }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const Divider = () => {
        return <View style={[styles.separator, { backgroundColor: theme.uiBackground }]} />
    };

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer]}>
            <View style={styles.cardDesc}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { color: theme.title }]}>{item.title}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.desc}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.price}</Text>
                </View>

                <CapsuleCounter />
            </View>

            <Image
                style={styles.cardImage}
                source={{
                    uri: item.url
                }}
                resizeMode='cover' />
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={Divider}
            />
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        minHeight: 150,
        marginBottom: 10,
        padding: 10,
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
        height: 120
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