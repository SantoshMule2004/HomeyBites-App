import { Alert, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { navigationProp } from '../../navigation/AppNavigator'
import { Colors } from '../../constants/Colors'
import { useAppTheme } from '../../stores/useAppTheme'
import { useMutation } from '@tanstack/react-query'
import { register, sendOtptoVerifyEmail, verifyOtpOnServer } from '../../services/AuthService'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Logo from '../../components/Logo'
import SecureTextInput from '../../components/SecureTextInput'
import axios from 'axios'
import ShowToast from '../../components/ShowToast'

const Register = () => {
  const navigation = useNavigation<navigationProp>()

  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isVerified, setIsVerified] = useState(true) // setting true for now, change to false when email service is running
  const [isOtpVisible, setIsOtpVisible] = useState(false)

  const [isPasswordVisible, setisPasswordVisible] = useState(false)
  const [isCPasswordVisible, setisCPasswordVisible] = useState(false)

  const registerUserMutation = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      if (!data?.success) {
        Alert.alert(data?.message)
        return
      }

      console.log("Registered successfully..!", data.message)
      Alert.alert("Registered successfully, log in to continue")

      ShowToast({ text: data.message })
      navigation.navigate('Login')
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

  const sendOtpMutation = useMutation({
    mutationFn: sendOtptoVerifyEmail,
    onSuccess: async (data) => {
      if (!data?.success) {
        Alert.alert(data?.message)
        return
      }

      console.log("OTP sent", data.message)
      Alert.alert(data.message)
      setIsOtpVisible(true)
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

  const verifyEmailMutation = useMutation({
    mutationFn: verifyOtpOnServer,
    onSuccess: async (data) => {
      if (!data?.success) {
        Alert.alert(data?.message)
        return
      }

      console.log("OTP sent", data.message)
      Alert.alert(data.message)
      setIsVerified(true)
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

  const verifyEmailId = () => {
    sendOtpMutation.mutate(emailId)
  }

  const verifyOtp = () => {
    verifyEmailMutation.mutate({ otp, emailId })
  }

  const registerUser = () => {
    if(!firstName.trim() || !lastName.trim() || !emailId.trim() || !phoneNo.trim() || !password.trim() || !cPassword.trim()) {
      ShowToast({ text: "Please fill all the fileds", success: false, position: 'top', topOffset: 30 })
      return
    }
    registerUserMutation.mutate({ firstName, middleName: '', lastName, emailId, phoneNo, verified: isVerified, password, cPassword })
  }

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedView style={styles.header}>
        <Logo />
      </ThemedView>

      <ThemedView style={styles.loginContainer}>
        <ThemedText title={true} style={[styles.text, { textAlign: 'left', color: Colors.primary }]}>
          Register
        </ThemedText>

        <Spacer height={20} />

        <ThemedTextInput
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter email ID"
          value={emailId}
          onChangeText={setEmailId}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter Phone number"
          value={phoneNo}
          onChangeText={setPhoneNo}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <SecureTextInput
          value={password}
          style={styles.textInput}
          setValue={setPassword}
          onClicked={() => setisPasswordVisible(!isPasswordVisible)}
          placeholder="Enter password"
          secureTextEntry={!isPasswordVisible}
          iconName={isPasswordVisible ? "eye" : "eye-off"} />

        <Spacer height={10} />

        <SecureTextInput
          value={cPassword}
          style={styles.textInput}
          setValue={setCPassword}
          onClicked={() => setisCPasswordVisible(!isCPasswordVisible)}
          placeholder="Confirm password"
          secureTextEntry={!isCPasswordVisible}
          iconName={isCPasswordVisible ? "eye" : "eye-off"} />

        {isOtpVisible &&
          <>
            <Spacer height={10} />

            <ThemedTextInput
              placeholder="Enter the OTP"
              value={otp}
              onChange={(item: string) => setOtp(item)}
              style={[styles.textInput, { borderBottomColor: theme.borderBottom }]}
              secureTextEntry={true} />
          </>}
      </ThemedView>

      <ThemedView style={styles.btnContainer}>
        {/* {!isOtpVisible &&
          <>
            <Spacer height={20} />
            <ThemedButton onPress={verifyEmailId}>
              <ThemedText btnText={true} style={styles.text}>

              </ThemedText>
            </ThemedButton>
          </>

        } */}

        <Spacer height={20} />
        {/* <ThemedButton disabled={sendOtpMutation.isPending || verifyEmailMutation.isPending || registerUserMutation.isPending} onPress={isOtpVisible ? isVerified ? registerUser : verifyOtp : verifyEmailId}>
          <ThemedText btnText={true} style={styles.text}>
            {sendOtpMutation.isPending || verifyEmailMutation.isPending || registerUserMutation.isPending ? "Loading..." : isOtpVisible ? isVerified ? "Register" : "Verify OTP" : "Verify Email"}
          </ThemedText>
        </ThemedButton> */}

        {/* {isOtpVisible && <>

          <Spacer height={20} />

          <ThemedButton onPress={registerUser}>
            <ThemedText btnText={true} style={styles.text}>
              Verify OTP
            </ThemedText>
          </ThemedButton>
        </>
        } */}

        <ThemedButton disabled={registerUserMutation.isPending} onPress={registerUser}>
          <ThemedText btnText={true} style={styles.text}>
            {registerUserMutation.isPending ? "Loading..." : "Register"}
          </ThemedText>
        </ThemedButton>

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
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnContainer: {
    padding: 20,
  },
})