import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CapsuleCounter from '../components/CapsuleCounter'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

const CartItem = ({ data }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, {borderBottomColor: theme.uiBackground,}]}>
            <View style={styles.cardDesc}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, {color: theme.title}]}>{item.title}</Text>
                    <Text style={[styles.text, {color: theme.text}]}>{item.desc}</Text>
                    <Text style={[styles.text, {color: theme.text}]}>{item.price}</Text>
                </View>

                <CapsuleCounter />
            </View>

            <Image
                style={styles.cardImage}
                source={{
                    uri: 'https://imgs.search.brave.com/X4N2evOQAeDBPpwI5xUaQ7pLXDcN68hKSAJHuSkACHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9vbmxp/bmV0b29scy5jb20v/aW1hZ2VzL2V4YW1w/bGVzLW9ubGluZWlt/YWdldG9vbHMvdHJl/ZS1zdXJyb3VuZGVk/LWJ5LXdhdGVyLXZl/cnRpY2FsLmpwZw'
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
        height: 150,
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 0.5,
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
    }
})