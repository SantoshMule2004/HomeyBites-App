import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { navigationProp } from '../../navigation/AppNavigator'
import { Colors } from '../../constants/Colors'
import { useAppTheme } from '../../stores/useAppTheme'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/AuthService'
import { useUserStore } from '../../stores/useUserStore'

import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import Logo from '../../components/Logo'
import SecureTextInput from '../../components/SecureTextInput'
import axios from 'axios'

const Login = () => {
  const navigation = useNavigation<navigationProp>()

  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const [emailId, setEmailId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isPasswordVisible, setisPasswordVisible] = useState(false)

  const saveLogin = useUserStore((state) => state.login)

  const togglePasswordVisibility = () => {
    setisPasswordVisible(!isPasswordVisible)
  }

  const loginUserMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data?.status != "success") {
        Alert.alert(data?.message)
        return
      }
      console.log("Login Successfully..!", data.user)

      saveLogin(data.user.userId, data.user.firstName, data.user.lastName, data.user.emailId, data.user.phoneNo, data.user.dob, data.user.gender, data.user.dietryPref, data.user.userRole, data.token)
      Alert.alert("Logged in successfully..!")

      navigation.navigate('BottomTabs', { screen: 'Home' })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        console.log("Backend Message:", backendMessage);
        Alert.alert(backendMessage)
      } else {
        console.log("Generic Error:", error.message);
      }
    }
  })

  const loginUser = () => {
    if (!emailId?.trim()) {
      Alert.alert("Please enter email id")
      return
    }

    if (!password?.trim()) {
      Alert.alert("Please enter password")
      return
    }

    loginUserMutation.mutate({ "username": emailId, "password": password })
  }

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedView style={styles.header}>
        <Logo />
      </ThemedView>

      <ThemedView style={styles.loginContainer}>
        <ThemedText title={true} style={[styles.text, { textAlign: 'left', color: Colors.primary }]}>
          Login to get started
        </ThemedText>

        <Spacer height={20} />

        <ThemedTextInput
          placeholder="Enter email ID"
          value={emailId}
          onChangeText={setEmailId}
          style={[styles.textInput, { borderBottomColor: theme.uiBackground }]} />

        <Spacer height={10} />

        <SecureTextInput
          value={password}
          style={styles.textInput}
          setValue={setPassword}
          onClicked={togglePasswordVisibility}
          placeholder="Enter password"
          secureTextEntry={!isPasswordVisible}
          iconName={isPasswordVisible ? "eye" : "eye-off"} />

        <Spacer height={3} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ThemedText style={{ color: Colors.secondary }}>Forgot Password?</ThemedText>
        </View>

      </ThemedView>

      <ThemedView style={styles.btnContainer}>
        <ThemedButton disabled={loginUserMutation.isPending} onPress={loginUser}>
          <ThemedText btnText={true} style={styles.text}>
            {loginUserMutation.isPending ? "Loading..." : "Login"}
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