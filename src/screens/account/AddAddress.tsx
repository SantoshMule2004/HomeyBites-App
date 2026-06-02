import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import { Colors } from '../../constants/Colors'
import { useAppTheme } from '../../stores/useAppTheme'

const AddAddress = () => {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

  const [fullName, setFullName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [addLine, setAddline] = useState("")
  const [area, setArea] = useState("")
  const [landmark, setLandmark] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [country, setCountry] = useState("India")

  const onSubmit = () => {
    if (!fullName.trim() || !contactNo.trim()) {
      Alert.alert("Please enter contact details")
      return
    }

    if (!addLine.trim() || !area.trim() || !landmark.trim() || !city.trim() || !state.trim() || !pinCode.trim() || !country.trim()) {
      Alert.alert("Please provide all the required address details")
      return
    }
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedView style={{ flex: 1, padding: 10 }}>
        <ThemedTextInput
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom, }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Enter phone number"
          value={contactNo}
          onChangeText={setContactNo}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Flat, house no, Building, Company, Apartment"
          value={addLine}
          onChangeText={setAddline}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Area, street, sector, village"
          value={area}
          onChangeText={setArea}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Landmark"
          value={landmark}
          onChangeText={setLandmark}
          style={[styles.textInput, { borderBottomColor: theme.borderBottom }]} />

        <Spacer height={10} />

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <ThemedTextInput
            placeholder="6-digit Pincode"
            value={pinCode}
            onChangeText={setPinCode}
            keyboardType='number-pad'
            style={[styles.textInput, { flex: 1, borderBottomColor: theme.borderBottom }]} />

          <ThemedTextInput
            placeholder="City/Town"
            value={city}
            onChangeText={setCity}
            style={[styles.textInput, { flex: 1, borderBottomColor: theme.borderBottom }]} />
        </View>

        <Spacer height={10} />

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <ThemedTextInput
            placeholder="state"
            value={state}
            onChangeText={setState}
            style={[styles.textInput, { flex: 1, borderBottomColor: theme.borderBottom }]} />

          <ThemedTextInput
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            style={[styles.textInput, { flex: 1, borderBottomColor: theme.borderBottom }]} />
        </View>
      </ThemedView>

      <Spacer height={20} />

      <ThemedButton style={styles.btnContainer} onPress={onSubmit}>
        <ThemedText btnText={true} style={styles.text}>
          {/* {registerUserMutation.isPending ? "Loading..." : "Register"} */} Add new address
        </ThemedText>
      </ThemedButton>
    </ThemedView>
  )
}

export default AddAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
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
    marginHorizontal: 20
  },
})