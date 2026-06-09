import React, { useState } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useUserStore } from '../../stores/useUserStore'
import { useMutation } from '@tanstack/react-query'
import { addAddress } from '../../services/UserService'

import ThemedView from '../../components/ThemedView'
import IonIcons from '../../components/IonIcons'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import CustomRadioButton from '../../components/CustomRadioButton'
import Spacer from '../../components/Spacer'
import axios from 'axios'
import ShowToast from '../../components/ShowToast'
import ThemedDialogContainer from '../../components/ThemedDialogContainer'

type ConfirmAddressProps = NativeStackScreenProps<RootStackParamList, 'ConfirmAddress'>;

const ConfirmAddress = ({ route, navigation }: ConfirmAddressProps) => {
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const fName = useUserStore((state) => state.firstName)
    const lName = useUserStore((state) => state.lastName)
    const pNo = useUserStore((state) => state.phoneNo)
    const userId = useUserStore((state) => state.userId)

    const [fullName, setFullName] = useState(`${fName} ${lName}`)
    const [contactNo, setContactNo] = useState(pNo)
    const [addLine, setAddline] = useState("")
    const [street, setStreet] = useState("")
    const [addressType, setAddressType] = useState("home")
    const [addressName, setAddressname] = useState("")

    const [isDialogVisible, setIsDialogVisible] = useState(false)

    const options = [
        { label: 'Home', value: 'home' },
        { label: 'Office', value: 'office' },
        { label: 'Other', value: 'other' },
    ]

    const onSubmit = () => {
        if (!fullName.trim() || !contactNo.trim() || !addLine.trim()) {
            // Alert.alert("Please fill all the required fields")
            ShowToast({ text: 'Please fill all the required fields', success: false, position: 'top', topOffset: 30 })
            return
        }

        // Alert.alert("Confirm details", "",
        //     [
        //         { text: 'Edit details', onPress: () => console.log('Cancel'), style: 'cancel' },
        //         {
        //             text: 'Confirm', onPress: () => addAddressMutation.mutate({
        //                 userId,
        //                 addressRequest: {
        //                     addressLine: addLine,
        //                     area: route.params.address.display_name,
        //                     latitude: route.params.address.lat,
        //                     longitude: route.params.address.lon,
        //                     receiverContactNo: contactNo,
        //                     receiverName: fullName,
        //                     addressName,
        //                     addressType
        //                 }
        //             })
        //         }
        //     ]
        // )

        setIsDialogVisible(true)
    }

    const addAddressMutation = useMutation({
        mutationFn: addAddress,
        onSuccess: async (data) => {
            console.log(data.message)
            // Alert.alert(data.message)
            ShowToast({ text: data.message })
            navigation.navigate('BottomTabs', { screen: 'Account' })
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

    return (
        <ThemedView safe={true} style={[styles.container, { paddingBottom: Platform.OS === 'android' ? 20 : 0 }]} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 10, backgroundColor: theme.navBackground }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <IonIcons name="arrow-back" style={{ backgroundColor: 'transparent', borderRadius: 0 }} size={24} />
                </TouchableOpacity>

                <ThemedText numberOfLines={1} style={{ flex: 1, marginHorizontal: 5 }}>{route.params.address.display_place} | {route.params.address.display_address}</ThemedText>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>

                <ThemedText style={{ fontWeight: '500' }}>Receiver Details</ThemedText>
                <Spacer height={10} />
                <View style={{ backgroundColor: theme.uiBackground, borderRadius: 10, padding: 10 }}>
                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Full name*</ThemedText>
                    <ThemedTextInput
                        // placeholder="Enter full name"
                        value={fullName}
                        onChangeText={setFullName}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom, }]} />

                    <Spacer height={5} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Phone number*</ThemedText>
                    <ThemedTextInput
                        // placeholder="Enter phone number"
                        value={contactNo}
                        onChangeText={setContactNo}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />
                </View>

                <Spacer height={20} />

                <ThemedText style={{ fontWeight: '500' }}>Location Details</ThemedText>
                <Spacer height={10} />
                <View style={{ backgroundColor: theme.uiBackground, borderRadius: 10, padding: 10 }}>

                    <CustomRadioButton options={options} selectedValue={addressType} onSelect={(type: string) => setAddressType(type)} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Flat, house no, Building, Company, Apartment*</ThemedText>
                    <ThemedTextInput
                        // placeholder="Flat, house no, Building, Company, Apartment"
                        value={addLine}
                        onChangeText={setAddline}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                    <Spacer height={5} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Street</ThemedText>
                    <ThemedTextInput
                        // placeholder="street"
                        value={street}
                        onChangeText={setStreet}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                    <Spacer height={5} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Area/locality*</ThemedText>
                    <ThemedTextInput
                        value={route.params.address.display_name}
                        editable={false}
                        multiline={true}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                    <Spacer height={5} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Address name</ThemedText>
                    <ThemedTextInput
                        // placeholder="street"
                        value={addressName}
                        onChangeText={setAddressname}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />
                </View>
            </View>

            <ThemedButton style={{ margin: 10 }} disabled={addAddressMutation.isPending} onPress={onSubmit}>
                <ThemedText btnText={true} style={styles.btnText}>{addAddressMutation.isPending ? "Loading..." : "Add new Address"}</ThemedText>
            </ThemedButton>

            <ThemedDialogContainer
                visible={isDialogVisible}
                title="Please confirm address details"
                desc={`Receiver Details: \nFull Name: ${fullName}\nContact No.: ${contactNo}\n\nLocation Details:\n${addLine}, ${street}${street ? ', ' : ''} ${route.params.address.display_name}`}
                value={route.params.address.display_name}
                placeholder="enter the otp here"
                addressContainer={true}
                btn1Label="Edit details"
                btn2Label="CONFIRM"
                btn1OnPress={() => setIsDialogVisible(false)}
                btn2OnPress={() => addAddressMutation.mutate({
                    userId,
                    addressRequest: {
                        addressLine: addLine,
                        area: route.params.address.display_name,
                        latitude: route.params.address.lat,
                        longitude: route.params.address.lon,
                        receiverContactNo: contactNo,
                        receiverName: fullName,
                        addressName,
                        addressType
                    }
                })} />
        </ThemedView>
    )
}

export default ConfirmAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconButton: {
        padding: 8,
    },
    card: {
        margin: 10
    },
    btnText: {
        textAlign: 'center',
    },
    text: {
        textAlign: 'left'
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    cardDesc: {
        flex: 1,
        paddingHorizontal: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 16,
    },
    textInput: {
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 15,
        backgroundColor: 'transparent',
    },
})