import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Colors'
import { useAppTheme } from '../../stores/useAppTheme'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { navigationProp } from '../../navigation/AppNavigator'

import SectionItemList from '../../components/SectionList'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserStore } from '../../stores/useUserStore'

const Account = () => {
  const colorScheme = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const navigation = useNavigation<accountNavigationProp>()
  const appNavigation = useNavigation<navigationProp>()

  const insets = useSafeAreaInsets()

  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const logoutUser = useUserStore((state) => state.logout)
  const firstName = useUserStore((state) => state.firstName)
  const lastName = useUserStore((state) => state.lastName)
  const emailId = useUserStore((state) => state.emailId)

  const logout = () => {
    Alert.alert("Logout", "Are you sure, you want to logout?",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'OK', onPress: () => logoutUser() }
      ]
    )
  }

  const login = () => {
    appNavigation.push('Login')
  }

  const onSectionListClicked = (value: string) => {
    if (value === "EditProfile")
      navigation.navigate('EditProfile')
    else if (value === "SavedAddresses")
      navigation.navigate('SavedAddresses')
    else if (value === "ForgetPassword")
      navigation.navigate('ForgetPassword')
    else if (value === "ResetPassword")
      navigation.navigate('ResetPassword')
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.profle, { justifyContent: isLoggedIn ? 'space-between' : 'flex-end', backgroundColor: theme.uiBackground }]}>
        {isLoggedIn ?
          <>
            <View>
              <ThemedText style={styles.text}>{firstName} {lastName}</ThemedText>
              <ThemedText>{emailId}</ThemedText>
            </View>
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: Colors.warnning, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Logout</Text>
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity onPress={login}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
        }
      </View>

      <SectionItemList onClicked={onSectionListClicked} />
    </ThemedView>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    borderRadius: 20,
    elevation: 6,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  }
})