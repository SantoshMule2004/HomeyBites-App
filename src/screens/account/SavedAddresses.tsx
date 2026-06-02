import { Alert, StyleSheet } from 'react-native'
import React from 'react'
import { Address } from '../../types/Type'

import ThemedView from '../../components/ThemedView'
import CustomAddress from '../../components/CustomAddress'
import CustomTextWithIcon from '../../components/CustomTextWithIcon'
import Spacer from '../../components/Spacer'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useNavigation } from '@react-navigation/native'
import { navigationProp } from '../../navigation/AppNavigator'

const data: Address[] = [
  { name: 'alice', apartment: 'XYZ', street: '40th 11th', city: 'AC', state: 'MH', pinCode: 12, phoneNo: 12 },
]
const SavedAddresses = () => {
  const navigation = useNavigation<accountNavigationProp>()
    const appNavigation = useNavigation<navigationProp>()

  const onEdit = (id: string) => {
    // Alert.alert("Edit Clicked")
  }

  const onRemove = (id: string) => {
    Alert.alert("Delete Address", "Do you really want to delete this address?",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'OK' }
      ]
    )
  }

  const addNewAddress = () => {
    appNavigation.navigate('AddAddress')
  }

  return (
    <ThemedView style={styles.container}>
      <CustomTextWithIcon text="Add new address" iconName="chevron-forward" addNewAddress={addNewAddress} />
      <Spacer height={10} />
      <CustomAddress data={data} onEditPressed={onEdit} onRemovedPressed={onRemove} />
    </ThemedView>
  )
}

export default SavedAddresses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
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