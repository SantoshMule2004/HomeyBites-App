import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import IonIcons from '../../components/IonIcons'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import Spacer from '../../components/Spacer'

type ConfirmAddressProps = NativeStackScreenProps<RootStackParamList, 'ConfirmAddress'>;

const ConfirmAddress = ({ route, navigation }: ConfirmAddressProps) => {
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const [fullName, setFullName] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [addLine, setAddline] = useState("")
    const [area, setArea] = useState("")
    const [landmark, setLandmark] = useState("")
    const [latitude, setLatitude] = useState(route.params.address.lat)
    const [longitude, setLongitude] = useState(route.params.address.lon)

    const onSubmit = () => {
        if (!fullName.trim() || !contactNo.trim() || !addLine.trim()) {
            Alert.alert("Please fill all the required fields")
            return
        }

        Alert.alert("Address added successfully")
        navigation.navigate('BottomTabs', { screen: 'Account' })
    }

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
                        value={area}
                        onChangeText={setArea}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

                    <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Area/locality*</ThemedText>
                    <ThemedTextInput
                        value={route.params.address.display_name}
                        editable={false}
                        multiline={true}
                        style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />
                </View>
            </View>

            <ThemedButton style={{ margin: 10 }} onPress={onSubmit}>
                <ThemedText btnText={true} style={styles.btnText}>Add new Address</ThemedText>
            </ThemedButton>
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