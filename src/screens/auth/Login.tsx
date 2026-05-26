import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { navigationProp } from '../../navigation/AppNavigator'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const Login = () => {
  const navigation = useNavigation<navigationProp>()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedView style={styles.header}>
        {/* <ThemedText style={styles.titleText}>App Name</ThemedText> */}
        <Image
          source={require('../../assets/homeybites-logo.png')}
          style={styles.logo}
        />
      </ThemedView>

      <ThemedView style={styles.loginContainer}>
        <ThemedText title={true} style={[styles.text, { textAlign: 'left' }]}>
          Login to get started
        </ThemedText>

        <Spacer height={20} />

        <ThemedTextInput
          placeholder="Enter email ID"
          value={email}
          onChange={(item: string) => setEmail(item)}
          style={styles.textInput} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter password"
          value={password}
          onChange={(item: string) => setPassword(item)}
          style={styles.textInput} />

        <Spacer height={3} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ThemedText style={{ color: Colors.secondary }}>Forgot Password?</ThemedText>
        </View>

      </ThemedView>

      <ThemedView style={styles.btnContainer}>
        <ThemedButton>
          <ThemedText btnText={true} style={styles.text}>
            Login
          </ThemedText>
        </ThemedButton>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <ThemedText style={styles.text}>Don't have an account? </ThemedText>
          <ThemedText style={{ color: Colors.secondary }} onPress={() => navigation.replace('Register')}>register</ThemedText>
        </View>
      </ThemedView>

    </ThemedView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center'
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    // width: '80%'
  },
  text: {
    textAlign: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnContainer: {
    padding: 20,
  },
  logo: {
    width: 150,
    height: 75,
    resizeMode: 'center'
  }
})