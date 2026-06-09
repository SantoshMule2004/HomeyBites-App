import { Alert, RefreshControl, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteCartItem, getCartItems, updateCartItem } from '../services/CartService'
import { useUserStore } from '../stores/useUserStore'

import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import CartItem from '../components/CartItem'
import LoadingContainer from '../components/LoadingContainer'
import axios from 'axios'

const Cart = () => {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const insets = useSafeAreaInsets()
  const userId = useUserStore((state) => state.userId)
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  const { data, isPending, isFetching, error, refetch } = useQuery({
    queryKey: ['cart-items', isLoggedIn],
    queryFn: () => getCartItems(userId),
    enabled: isLoggedIn,
    // staleTime: 1000 * 60 * 5,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: async (data) => {
      Alert.alert(data.message)
       refetch()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        console.log("Backend Message:", backendMessage);
        Alert.alert(backendMessage)
      } else {
        console.log("Generic Error:", error.message);
      }
    }
  })

  const removeItemMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async (data) => {
      Alert.alert(data.message)
      refetch()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        console.log("Backend Message:", backendMessage);
        Alert.alert(backendMessage)
      } else {
        console.log("Generic Error:", error.message);
      }
    }
  })

  const onValueChange = (count: number, cartItemId: number) => {
    if (count == 0) {
      Alert.alert("Remove", "Are you sure, you want to remove this item from cart?",
        [
          { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
          { text: 'OK', onPress: () => removeItemMutation.mutate(cartItemId) }
        ]
      )
    } else {
      updateQuantityMutation.mutate({ cartItemId, quantity: count })
    }
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={[styles.header, { backgroundColor: theme.uiBackground }]}>
        <View>
          <ThemedText style={{ fontSize: 20, fontWeight: '600' }}>Subtotal</ThemedText>
          <ThemedText style={{ fontSize: 20 }}>₹{data?.grandTotal || 0}</ThemedText>
        </View>
        <ThemedButton style={styles.btn}>
          <ThemedText btnText={true}>Place Order</ThemedText>
        </ThemedButton>
      </ThemedView>
      <ThemedView style={styles.itemContainer}>
        {
          !isLoggedIn
            ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
              <ThemedText style={{ fontWeight: '500' }}>Please log in to add items to cart</ThemedText>
            </View>
            : (isPending
              ? <LoadingContainer />
              : <CartItem data={data?.cartItems} refreshControl={<RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />}
                onValueChange={onValueChange}
              />)}
      </ThemedView>
    </ThemedView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    margin: 10
  },
  btn: {
  }
})