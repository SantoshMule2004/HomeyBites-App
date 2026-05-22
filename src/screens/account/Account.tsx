import { Alert, StatusBarStyle, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { useNavigation } from '@react-navigation/native'
import ThemedView from '../../components/ThemedView'
import SectionItemList from '../../components/SectionList'
import { Colors } from '../../constants/Colors'
import { useAppTheme } from '../../stores/useAppTheme'
import ThemedText from '../../components/ThemedText'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'

type navigationProp = NativeStackNavigationProp<RootStackParamList>

const Account = () => {
  const colorScheme = useAppTheme()
  // const theme = Colors[colorScheme] ?? Colors.light

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
      <View style={[styles.profle, { justifyContent: isLogin ? 'space-between' : 'flex-end' }]}>
        {isLogin ?
          <>
            <ThemedText style={styles.text}>Name</ThemedText>
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: Colors.warnning, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Logout</Text>
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity onPress={login}>
            <Text style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
        }
      </View>

      <SectionItemList onClicked={onSectionListClicked} />

      {/*<ThemedButton onPress={() => navigation.push('Login')}>
            <ThemedText btnText={true}>Login</ThemedText>
          </ThemedButton>
        <ThemedButton onPress={ () => navigation.push('Register') }>
        <ThemedText btnText={true}>Register</ThemedText>
      </ThemedButton> */}

      {/* {isLogin &&
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={{ color: '#FF6B6B', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Logout</Text>
            </TouchableOpacity>
          </View>} */}
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
    // elevation: 6,
    // borderColor: 'black',
    padding: 20,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  }
})