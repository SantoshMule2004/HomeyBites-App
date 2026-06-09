import { Alert, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useNavigation } from '@react-navigation/native'
import { verifyOtpOnServer } from '../../services/AuthService'
import { useUserStore } from '../../stores/useUserStore'
import { useMutation } from '@tanstack/react-query'
import { sendOtp, updateUserDetails, updateUserEmail } from '../../services/UserService'

import EditableImage from '../../components/EditableImage'
import Spacer from '../../components/Spacer'
import VerifyAndUpdate from '../../components/VerifyAndUpdate'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedText from '../../components/ThemedText'
import ThemedDialogContainer from '../../components/ThemedDialogContainer'
import axios from 'axios'
import ShowToast from '../../components/ShowToast'

const EditProfile = () => {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const navigation = useNavigation<accountNavigationProp>()

  const fName = useUserStore((state) => state.firstName)
  const lName = useUserStore((state) => state.lastName)
  const eId = useUserStore((state) => state.emailId)
  const pNo = useUserStore((state) => state.phoneNo)
  const userId = useUserStore((state) => state.userId)
  const updateDetails = useUserStore((state) => state.updateUserDetails)
  const updateEmail = useUserStore((state) => state.updateUserEmail)

  const [firstName, setFirstName] = useState(fName)
  const [lastName, setLastName] = useState(lName)
  const [emailId, setEmailId] = useState(eId)
  const [phoneNo, setPhoneNO] = useState(pNo)
  const [otp, setOtp] = useState("")
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  // api call for user details updation
  const updateDetailsMutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: async (data) => {
      console.log(data.message)

      // Alert.alert(data.message)
      ShowToast({ text: data.message })
      updateDetails(firstName, lastName)
      navigation.navigate('AccountInfo')
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

  // api call for user email updation
  const updateEmailMutation = useMutation({
    mutationFn: updateUserEmail,
    onSuccess: async (data) => {
      console.log(data.message)

      setIsDialogVisible(false)
      // Alert.alert(data.message)
      ShowToast({ text: data.message })
      updateEmail(emailId)
      navigation.navigate('AccountInfo')
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

  // api call for sending otp to verify email
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: async (data) => {
      console.log(data.message)
      setIsDialogVisible(true)
      // Alert.alert(data.message)
      ShowToast({ text: data.message })
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

  // api call for otp verification
  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpOnServer,
    onSuccess: async (data) => {
      console.log(data.message)

      if (eId === emailId) {
        // Alert.alert(data.message)
        ShowToast({ text: data.message })
        setIsDialogVisible(false)
      } else {
        // change email to specified
        updateEmailMutation.mutate({ userId, email: emailId })
      }
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

  const onSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      // Alert.alert("Please enter the details first")
      ShowToast({ text: "Please enter the details first", success: false, position: 'top', topOffset: 30 })
      return
    }
    updateDetailsMutation.mutate({ userId, updateDetailsDto: { firstName, lastName } })
  }

  const onVerifyOtp = () => {
    if (!otp.trim()) {
      // Alert.alert("Please enter the OTP")
      ShowToast({ text: "Please enter the OTP", success: false, position: 'top', topOffset: 30 })
      return
    }
    verifyOtpMutation.mutate({ otp, emailId })
  }

  const onSendOtp = () => {
    if (!emailId.trim()) {
      // Alert.alert("Email field cannot be empty")
      ShowToast({ text: "Email field cannot be empty", success: false, position: 'top', topOffset: 30 })
      return
    }
    sendOtpMutation.mutate(emailId)
  }

  return (
    <ThemedView safe={true} style={{ flex: 1 }}>
      <View style={styles.profile}>
        <EditableImage onEditPressed={() => Alert.alert("Edit")} />
      </View>

      <Spacer />

      <View style={{ marginHorizontal: 10 }}>
        <ThemedText style={styles.text}>First name</ThemedText>
        <ThemedTextInput style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} onChangeText={setFirstName} value={firstName} autoCapitalize='none' />

        <Spacer height={10} />

        <ThemedText style={styles.text}>Last name</ThemedText>
        <ThemedTextInput style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} onChangeText={setLastName} value={lastName} autoCapitalize='none' />

        <Spacer height={20} />

        <Pressable style={styles.updateBtn} onPress={onSubmit}>
          <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>SUBMIT</ThemedText>
        </Pressable>
      </View>

      <Spacer />

      <VerifyAndUpdate value={emailId} setValue={setEmailId} text="Email Id" btnText="verify" onClicked={onSendOtp} />

      {/* <VerifyAndUpdate value={phoneNo} setValue={setPhoneNO} text="Phone number" btnText="update" onClicked={() => Alert.alert("Phone number update")} /> */}

      <ThemedDialogContainer
        visible={isDialogVisible}
        title="Email Verification"
        desc="Enter the OTP sent to your email address"
        value={otp}
        onChangeText={setOtp}
        placeholder="enter the otp here"
        btn1Label="Cancel"
        btn2Label="Submit"
        btn1OnPress={() => setIsDialogVisible(false)}
        btn2OnPress={onVerifyOtp} />
    </ThemedView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 12
  },
  updateBtn: {
    alignSelf: 'center'
  }
})