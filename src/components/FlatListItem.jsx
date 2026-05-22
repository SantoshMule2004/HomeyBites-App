import { StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedCard from './ThemedCard'
import ThemedText from './ThemedText'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const FlatListItem = ({ item, saving = false, savingItem = false, category = false }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    if (category)
        return (
            <ThemedCard style={[styles.listCard, { borderLeftColor: theme.iconColor }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <ThemedText style={styles.cardTitle}>{item.value}</ThemedText>
                </View>
            </ThemedCard>
        )

    if (saving)
        return (
            <ThemedCard style={[styles.listCard, { borderLeftColor: theme.iconColor }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <ThemedText style={styles.cardTitle}>{item.category}</ThemedText>
                    <ThemedText style={[styles.cardTitle, { color: item.totalAmount ? Colors.success : Colors.failure }]}>
                        ₹{item.totalAmount ? item.totalAmount : 0}
                    </ThemedText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ThemedText style={styles.listText}> {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour12: true
                    })
                    }</ThemedText>
                </View>
            </ThemedCard>
        )

    if (savingItem)
        return (
            <ThemedCard style={[styles.listCard, { borderLeftColor: theme.iconColor }]}>
                <ThemedText style={[styles.cardTitle, { color: Colors.success }]}>
                    ₹{item.amount}
                </ThemedText>
                <ThemedText style={[styles.listText, { fontSize: 10, textAlign: 'right' }]}> {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
                }</ThemedText>
            </ThemedCard>
        )

    return (
        <ThemedCard style={[styles.listCard, { borderLeftColor: theme.iconColor }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <ThemedText style={styles.cardTitle}>{item?.note ? item?.note : item.category}</ThemedText>
                <ThemedText style={[styles.cardTitle, { color: item.type == "Credit" ? Colors.success : Colors.failure }]}>₹{item.amount}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText style={styles.listText}> {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
                }</ThemedText>
                <ThemedText style={styles.listText}> {item?.type}</ThemedText>
            </View>
        </ThemedCard>
    )
}

export default FlatListItem

const styles = StyleSheet.create({
    listCard: {
        padding: 10,
        marginVertical: 5,
        paddingLeft: 14,
        borderLeftWidth: 4,
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    listText: {
        fontSize: 12,
    },
})