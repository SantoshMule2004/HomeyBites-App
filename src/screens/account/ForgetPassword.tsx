import { Alert, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { useMutation } from '@tanstack/react-query'
import { resetPasswordAfterForget, sendOtp } from '../../services/UserService'
import { useNavigation } from '@react-navigation/native'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useUserStore } from '../../stores/useUserStore'
import { verifyOtpOnServer } from '../../services/AuthService'

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import SecureTextInput from '../../components/SecureTextInput'
import axios from 'axios'
import ThemedTextInput from '../../components/ThemedTextInput'
import ShowToast from '../../components/ShowToast'

const ForgetPassword = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const navigation = useNavigation<accountNavigationProp>()

    const emailAddress = useUserStore((state) => state.emailId)

    const [isVerified, setIsVerified] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [emailId, setEmaiId] = useState(emailAddress)

    const [newPassword, setNewPassword] = useState<string>("")
    const [cPassword, setcPassword] = useState<string>("")

    const [isPasswordVisible, setisPasswordVisible] = useState(false)
    const [isCPasswordVisible, setisCPasswordVisible] = useState(false)

    const resetPasswordMutation = useMutation({
        mutationFn: resetPasswordAfterForget,
        onSuccess: async (data) => {
            console.log(data.message)

            // Alert.alert(data.message)
            ShowToast({ text: data.message })

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
            setIsOtpSent(true)
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
            setIsVerified(true)
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

    const onSubmit = () => {
        if (!newPassword?.trim()) {
            Alert.alert("Please enter new password")
            ShowToast({ text: "Please enter new password", success: false, position: 'top', topOffset: 30 })
            return
        }

        if (!cPassword?.trim()) {
            Alert.alert("Please confirm password")
            ShowToast({ text: "Please confirm password", success: false, position: 'top', topOffset: 30 })
            return
        }

        resetPasswordMutation.mutate({ emailId, passwordData: { oldPassword: '', newPassword, cPassword } })
    }

    const onSendOtp = () => {
        if (!emailId?.trim()) {
            Alert.alert("Please enter email address")
            ShowToast({ text: "Please enter email address", success: false, position: 'top', topOffset: 30 })
            return
        }

        // setIsOtpSent(true)
        sendOtpMutation.mutate(emailId)
    }

    const onVerifyOtp = () => {
        if (!otp?.trim()) {
            Alert.alert("Please enter the OTP")
            ShowToast({ text: "Please enter the OTP", success: false, position: 'top', topOffset: 30 })
            return
        }
        // setIsVerified(true)
        verifyOtpMutation.mutate({ emailId, otp })
    }

    return (
        <ThemedView safe={true} style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 10 }}>

                {
                    isOtpSent ? !isVerified ?
                        <>
                            <ThemedText style={{ fontWeight: '700' }}>Enter the OTP sent to your Email address</ThemedText>
                            <Spacer height={10} />

                            <ThemedTextInput
                                placeholder="enter otp here"
                                value={otp}
                                onChangeText={setOtp}
                                style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                            <Spacer height={20} />

                            <Pressable disabled={resetPasswordMutation.isPending} style={styles.updateBtn} onPress={onVerifyOtp}>
                                <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>
                                    {verifyOtpMutation.isPending ? "Loading..." : "Verify OTP"}
                                </ThemedText>
                            </Pressable>
                        </>
                        :
                        <>
                            <SecureTextInput
                                value={newPassword}
                                style={styles.textInput}
                                setValue={setNewPassword}
                                onClicked={() => setisPasswordVisible(!isPasswordVisible)}
                                placeholder="enter new password"
                                secureTextEntry={!isPasswordVisible}
                                iconName={isPasswordVisible ? "eye" : "eye-off"} />

                            <Spacer height={10} />

                            <SecureTextInput
                                value={cPassword}
                                style={styles.textInput}
                                setValue={setcPassword}
                                onClicked={() => setisCPasswordVisible(!isCPasswordVisible)}
                                placeholder="confirm password"
                                secureTextEntry={!isCPasswordVisible}
                                iconName={isCPasswordVisible ? "eye" : "eye-off"} />

                            <Spacer height={20} />

                            <Pressable disabled={resetPasswordMutation.isPending} style={styles.updateBtn} onPress={onSubmit}>
                                <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>
                                    {resetPasswordMutation.isPending ? "Loading..." : "SUBMIT"}
                                </ThemedText>
                            </Pressable>
                        </>
                        :
                        <>
                            <ThemedText style={{ fontWeight: '700' }}>Email address</ThemedText>
                            <Spacer height={10} />

                            <ThemedTextInput
                                value={emailId}
                                onChangeText={setEmaiId}
                                style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                            <Spacer height={20} />

                            <Pressable disabled={resetPasswordMutation.isPending} style={styles.updateBtn} onPress={onSendOtp}>
                                <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>
                                    {sendOtpMutation.isPending ? "Loading..." : "Send OTP"}
                                </ThemedText>
                            </Pressable>
                        </>
                }
            </View>
        </ThemedView>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    text: {
        fontSize: 12
    },
    textInput: {
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 15,
        backgroundColor: 'transparent',
    },
    updateBtn: {
        alignSelf: 'center'
    }
})