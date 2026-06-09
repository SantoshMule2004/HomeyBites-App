import { Alert, RefreshControl, StyleSheet, View } from 'react-native'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useNavigation } from '@react-navigation/native'
import { navigationProp } from '../../navigation/AppNavigator'
import { useUserStore } from '../../stores/useUserStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteAddress, getAddresses } from '../../services/UserService'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'

import React from 'react'
import ThemedView from '../../components/ThemedView'
import CustomAddress from '../../components/CustomAddress'
import CustomTextWithIcon from '../../components/CustomTextWithIcon'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import axios from 'axios'
import ShowToast from '../../components/ShowToast'


const SavedAddresses = () => {
  const navigation = useNavigation<accountNavigationProp>()
  const appNavigation = useNavigation<navigationProp>()

  const colorScheme = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const userId = useUserStore((state) => state.userId)

  const { data, isPending, isFetching, error, refetch, } = useQuery({
    queryKey: ['user-addresses'],
    queryFn: () => getAddresses(userId),
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });

  const onEdit = (id: number) => {
    // Alert.alert("Edit Clicked")
  }

  const onRemove = (id: number) => {
    Alert.alert("Delete Address", "Do you really want to delete this address?",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'OK', onPress: () => deleteAddressMutation.mutate(id) }
      ]
    )
  }

  const addNewAddress = () => {
    appNavigation.navigate('AddAddress')
  }

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: async (data) => {
      console.log(data.message)
      // Alert.alert(data.message)
      ShowToast({ text: data.message })

      refetch()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        console.log("Backend Message:", backendMessage);
        // Alert.alert(backendMessage)
        ShowToast({ text: backendMessage, success: false, position: 'top', topOffset: 30 })
      } else {
        console.log("Generic Error:", error.message);
      }
    }
  })

  return (
    <ThemedView style={styles.container}>
      <CustomTextWithIcon text="Add new address" iconName="chevron-forward" addNewAddress={addNewAddress} />
      <Spacer height={10} />
      {isPending
        ?
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText style={{ fontWeight: '300', fontSize: 15 }}>loading addresse...</ThemedText>
        </View>
        :
        <CustomAddress data={data} onEditPressed={onEdit} onRemovedPressed={onRemove} refreshControl={<RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          tintColor={Colors.primary}
          colors={[Colors.primary]}
        />} />
      }
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