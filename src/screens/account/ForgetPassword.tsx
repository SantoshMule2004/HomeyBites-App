import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../services/UserService'
import { useNavigation } from '@react-navigation/native'
import { accountNavigationProp } from '../../navigation/AccountStackNavigator'
import { useUserStore } from '../../stores/useUserStore'

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import SecureTextInput from '../../components/SecureTextInput'
import axios from 'axios'
import ThemedTextInput from '../../components/ThemedTextInput'

const ForgetPassword = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const navigation = useNavigation<accountNavigationProp>()

    const emailAddress = useUserStore((state) => state.emailId)

    const [isVerified, setIsVerified] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [emailId, setEmaiId] = useState(emailAddress)

    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [cPassword, setcPassword] = useState<string>("")

    const [isOldPasswordVisible, setisOldPasswordVisible] = useState(false)
    const [isPasswordVisible, setisPasswordVisible] = useState(false)
    const [isCPasswordVisible, setisCPasswordVisible] = useState(false)

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: async (data) => {
            console.log(data.message)

            Alert.alert(data.message)

            navigation.navigate('AccountInfo')
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

    const onSubmit = () => {
        if (!oldPassword?.trim()) {
            Alert.alert("Please enter old password")
            return
        }

        if (!newPassword?.trim()) {
            Alert.alert("Please enter new password")
            return
        }

        if (!cPassword?.trim()) {
            Alert.alert("Please confirm password")
            return
        }

        resetPasswordMutation.mutate({ oldPassword, newPassword, cPassword })
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

                            <Pressable disabled={resetPasswordMutation.isPending} style={styles.updateBtn} onPress={onSubmit}>
                                <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>
                                    {resetPasswordMutation.isPending ? "Loading..." : "Verify OTP"}
                                </ThemedText>
                            </Pressable>
                        </>
                        :
                        <>
                            <SecureTextInput
                                value={oldPassword}
                                style={styles.textInput}
                                setValue={setOldPassword}
                                onClicked={() => setisOldPasswordVisible(!isOldPasswordVisible)}
                                placeholder="enter old password"
                                secureTextEntry={!isOldPasswordVisible}
                                iconName={isOldPasswordVisible ? "eye" : "eye-off"} />

                            <Spacer height={10} />

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
                            <ThemedTextInput
                                value={emailId}
                                onChangeText={setEmaiId}
                                style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                            <Spacer height={20} />

                            <Pressable disabled={resetPasswordMutation.isPending} style={styles.updateBtn} onPress={onSubmit}>
                                <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>
                                    {resetPasswordMutation.isPending ? "Loading..." : "Send OTP"}
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