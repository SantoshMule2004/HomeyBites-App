import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import CartItem from '../components/CartItem'

const DATA = [
    { id: '1', title: 'name', desc: 'desc', price: 'price' },
    { id: '2', title: 'name', desc: 'desc', price: 'price' },
    { id: '3', title: 'name', desc: 'desc', price: 'price' },
    { id: '4', title: 'name', desc: 'desc', price: 'price' },
    { id: '5', title: 'name', desc: 'desc', price: 'price' },
    { id: '6', title: 'name', desc: 'desc', price: 'price' },
    { id: '7', title: 'name', desc: 'desc', price: 'price' },
];


const Cart = () => {
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedView style={styles.header}>
        <View>
          <ThemedText style={{ fontSize: 20, fontWeight: '600' }}>Subtotal</ThemedText>
          <ThemedText style={{ fontSize: 20 }}>1,999</ThemedText>
        </View>
        <ThemedButton style={styles.btn}>
            <ThemedText style={{ color: '#fff' }}>Place Order</ThemedText>
        </ThemedButton>
      </ThemedView>
      <ThemedView style={styles.itemContainer}>
        <CartItem data={DATA} />
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
    elevation: 10,
    borderRadius: 10,
    margin: 10
  },
  btn: {
    backgroundColor: '#FFC000',
    borderRadius: 10
  }
})