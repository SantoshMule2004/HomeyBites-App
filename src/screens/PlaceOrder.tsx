import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useUserStore } from '../stores/useUserStore'
import { useQuery } from '@tanstack/react-query'
import { getCartItems } from '../services/CartService'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'
import { navigationProp } from '../navigation/AppNavigator'
import { useNavigation } from '@react-navigation/native'

import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'
import OrderSummaryItem from '../components/OrderSummaryItem'
import LoadingContainer from '../components/LoadingContainer'

const PlaceOrder = () => {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const userId = useUserStore((state) => state.userId)
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  const navigation = useNavigation<navigationProp>()

  const { data, isPending, isFetching, error, refetch } = useQuery({
    queryKey: ['cart-items', isLoggedIn],
    queryFn: () => getCartItems(userId),
    enabled: true,
    // staleTime: 1000 * 60 * 5,
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainerStyle} showsVerticalScrollIndicator={false}>
        <Spacer height={5} />
        <ThemedView style={[styles.addressContainer, { backgroundColor: theme.uiBackground, padding: 10 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <ThemedText style={styles.title}>Delivery to: Alice bob</ThemedText>
            <Pressable style={[styles.changeBtn, { borderColor: theme.iconColorFocused }]}>
              <ThemedText>Change</ThemedText>
            </Pressable>
          </View>
          <ThemedText>Address</ThemedText>
        </ThemedView>

        <Spacer height={10} />

        <View style={{ backgroundColor: theme.uiBackground, height: 'auto' }}>
          {isPending || isFetching ? <LoadingContainer /> : <OrderSummaryItem data={data?.cartItems} />}
        </View>

        <Spacer height={10} />

        <View style={[styles.priceContainer, { backgroundColor: theme.uiBackground, padding: 10, gap: 10 }]}>
          <ThemedText style={styles.title}>Price Details</ThemedText>
          <Spacer height={10} />
          <View style={styles.row}>
            <ThemedText>Price (1 item)</ThemedText>
            <ThemedText>₹{data?.grandTotal! + 200}</ThemedText>
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
            <ThemedText style={styles.title}>₹{data?.grandTotal! + 11}</ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.uiBackground, paddingHorizontal: 10, elevation: 10 }}>
        <ThemedText style={[styles.title, { flex: 1 }]}>₹{data?.grandTotal! + 11}</ThemedText>
        <ThemedButton style={{ flex: 1 }} onPress={() => navigation.navigate('Payment', { addressId: 1, grandTotal: data?.grandTotal })}>
          <ThemedText btnText={true} style={{ textAlign: 'center' }}>Continue</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {

  },
  addressContainer: {
    paddingBottom: 10
  },
  changeBtn: {
    borderWidth: 1,
    padding: 2
  },
  priceContainer: {

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