import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import Spacer from '../components/Spacer'
import IonIcons from '../components/IonIcons'

const Payment = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    return (
        <ThemedView>
            <ScrollView>
                <View style={[styles.priceContainer, { backgroundColor: theme.uiBackground, padding: 10, gap: 10 }]}>
                    <View style={styles.row}>
                        <ThemedText>Price (1 item)</ThemedText>
                        <ThemedText>₹800</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText>Discount</ThemedText>
                        <ThemedText>- ₹200</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText>Platform Fee</ThemedText>
                        <ThemedText>₹11</ThemedText>
                    </View>

                    <View style={{ backgroundColor: theme.borderBottom, height: 1, width: 'auto', marginVertical: 10 }} />

                    <View style={styles.row}>
                        <ThemedText style={styles.title}>Total Amount</ThemedText>
                        <ThemedText style={styles.title}>₹611</ThemedText>
                    </View>
                </View>

                <Spacer height={10} />
                <View style={[styles.paymentMethod, { backgroundColor: theme.uiBackground }]}>
                    <ThemedText style={styles.title}>Payment Methods</ThemedText>
                    <Spacer height={20} />

                    <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: theme.borderBottom, padding: 10 }]}>
                        <ThemedText>UPI</ThemedText>
                        <IonIcons name="chevron-down" style={{ backgroundColor: 'transparent' }} size={20} />
                    </View>

                    <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: theme.borderBottom, padding: 10 }]}>
                        <ThemedText>Credit / Debit / ATM Card</ThemedText>
                        <IonIcons name="chevron-down" style={{ backgroundColor: 'transparent' }} size={20} />
                    </View>

                    <View style={[styles.row, { padding: 10 }]}>
                        <ThemedText>Cash on Delivery</ThemedText>
                        <IonIcons name="chevron-down" style={{ backgroundColor: 'transparent' }} size={20} />
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    )
}

export default Payment

const styles = StyleSheet.create({
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 20
    },
    paymentMethod: {
        padding: 10
    },
    priceContainer: {
        borderRadius: 5,
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '500',
        fontSize: 15
    }

})