import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'
import ThemedText from './ThemedText'

const OrderSummaryItem = ({ data }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const Divider = () => {
        return <View style={[styles.separator, { backgroundColor: theme.borderBottom }]} />
    };

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer]}>
            <Image
                style={styles.cardImage}
                source={{
                    uri: item.imageUrl
                }}
                resizeMode='cover' />

            <View style={styles.cardDesc}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { color: theme.title }]}>{item.menuName}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>{item.description}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>₹{item.currentPrice}</Text>
                    <Text style={[styles.text, { color: theme.text }]}>quantity: {item.quantity}</Text>
                </View>
            </View>
        </View>
    );

    const EmptyMenu = () => {
        return <View style={[styles.container, { alignItems: 'center', marginTop: 70 }]}>
            <ThemedText style={{ fontWeight: '400', fontSize: 18 }}>Cart is Empty</ThemedText>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.cartItemId}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={Divider}
                ListEmptyComponent={EmptyMenu}
                scrollEnabled={false}
            />
        </View>
    )
}

export default OrderSummaryItem

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