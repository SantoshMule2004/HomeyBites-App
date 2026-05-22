import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import CustomAddress from '../../components/CustomAddress'
import IonIcons from '../../components/IonIcons'
import { Address } from '../../types/Type'
import CustomTextWithIcon from '../../components/CustomTextWithIcon'
import Spacer from '../../components/Spacer'

const data: Address[] = [
  { name: 'alice', apartment: 'XYZ', street: '40th 11th', city: 'AC', state: 'MH', pinCode: 12, phoneNo: 12 },
]

const onEdit = (id: string) => {
  // Alert.alert("Edit Clicked")
}

const onRemove = (id: string) => {
  // Alert.alert("Remove Clicked")
}

const addNewAddress = () => {
  Alert.alert("new address")
}

const SavedAddresses = () => {
  return (
    <ThemedView safe={true} style={styles.container}>
      {/* <TouchableOpacity style={styles.titleContainer} onPress={addNewAddress}>
        <ThemedText title={true} style={styles.title}>Add new address</ThemedText>
        <IonIcons name="chevron-forward" style={{ backgroundColor: 'transparent' }} size={24} />
      </TouchableOpacity> */}

      <CustomTextWithIcon text="Add new address" iconName="chevron-forward" addNewAddress={addNewAddress} />

      <Spacer height={10} />

      <CustomAddress data={data} onEditPressed={onEdit} onRemovedPressed={onRemove} />

    </ThemedView>
  )
}

export default SavedAddresses

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    borderTopColor: '#eee',
  },
  title: {
    fontSize: 15,
  },
})