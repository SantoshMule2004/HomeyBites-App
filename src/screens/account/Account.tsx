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

const Account = () => {
  const colorScheme = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const navigation = useNavigation<accountNavigationProp>()
  const appNavigation = useNavigation<navigationProp>()

  const [isLogin, setIsLogin] = useState(false)

  const logout = () => {
    Alert.alert("Logout", "Are you sure, you want to logout?",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'OK', onPress: () => setIsLogin(false) }
      ]
    )
  }

  const login = () => {
    // setIsLogin(true)
    appNavigation.push('Login')
  }

  const onSectionListClicked = (value: string) => {
    if (value === "EditProfile")
      navigation.navigate('EditProfile')
    else if (value === "SavedAddresses")
      navigation.navigate('SavedAddresses')
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <View style={[styles.profle, { justifyContent: isLogin ? 'space-between' : 'flex-end', backgroundColor: theme.uiBackground }]}>
        {isLogin ?
          <>
            <ThemedText style={styles.text}>Name</ThemedText>
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
    // backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 6,
    // borderColor: 'black',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  }
})