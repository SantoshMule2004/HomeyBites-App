import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { navigationProp } from '../../navigation/AppNavigator'
import { Colors } from '../../constants/Colors'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'



const Register = () => {
  const navigation = useNavigation<navigationProp>()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [isOtpVisible, setIsOtpVisible] = useState(false)

  const verifyEmailId = () => {
    Alert.alert("isVerified: isVerified")
    setIsOtpVisible(true)
  }

  const registerUser = () => {
    Alert.alert("Register User")
  }

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
          Register
        </ThemedText>

        <Spacer height={20} />

        <ThemedTextInput
          placeholder="Enter your name"
          value={name}
          onChange={(item: string) => setName(item)}
          style={styles.textInput} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter email ID"
          value={email}
          onChange={(item: string) => setEmail(item)}
          style={styles.textInput} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter Phone number"
          value={phoneNo}
          onChange={(item: string) => setPhoneNo(item)}
          style={styles.textInput} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter password"
          value={password}
          onChange={(item: string) => setPassword(item)}
          style={styles.textInput}
          secureTextEntry={true}
        />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Confirm password"
          value={cPassword}
          onChange={(item: string) => setCPassword(item)}
          style={styles.textInput}
          secureTextEntry={true} />

        {isOtpVisible &&
          <>
            <Spacer height={10} />

            <ThemedTextInput
              placeholder="Enter the OTP"
              value={otp}
              onChange={(item: string) => setOtp(item)}
              style={styles.textInput}
              secureTextEntry={true} />
          </>}
      </ThemedView>

      <ThemedView style={styles.btnContainer}>
        {!isOtpVisible &&
          <>
            <Spacer height={20} />
            <ThemedButton onPress={verifyEmailId}>
              <ThemedText btnText={true} style={styles.text}>
                Verify Email
              </ThemedText>
            </ThemedButton>
          </>

        }

        {isOtpVisible && <>


          <Spacer height={20} />

          <ThemedButton onPress={registerUser}>
            <ThemedText btnText={true} style={styles.text}>
              Register
            </ThemedText>
          </ThemedButton>
        </>
        }

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <ThemedText style={styles.text}>Already have an account? </ThemedText>
          <ThemedText style={{ color: Colors.secondary }} onPress={() => navigation.replace('Login')}>login</ThemedText>
        </View>
      </ThemedView>

    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
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