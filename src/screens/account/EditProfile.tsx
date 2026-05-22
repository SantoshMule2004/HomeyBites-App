import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import IonIcons from '../../components/IonIcons'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import { useAppTheme } from '../../stores/useAppTheme'
import EditableImage from '../../components/EditableImage'
import VerifyAndUpdate from '../../components/VerifyAndUpdate'
import { Colors } from '../../constants/Colors'
import Spacer from '../../components/Spacer'

const EditProfile = () => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const [name, setName] = useState("Alice Karen")
  const [email, setEmail] = useState("alicek@gmail.com")
  const [phoneNo, setPhoneNO] = useState("+919878653467")
  return (
    <ThemedView safe={true} style={{ flex: 1 }}>
      <View style={styles.profile}>
        <EditableImage onEditPressed={() => Alert.alert("Edit")} />
      </View>

      <Spacer />

      <View style={{ marginHorizontal: 10 }}>
        <ThemedText style={styles.text}>Name</ThemedText>
        <ThemedTextInput style={[styles.textInput, { borderBottomColor: theme.uiBackground }]} onChangeText={setName} value={name} autoCapitalize='none' />

        <Spacer height={20} />

        <Pressable style={styles.updateBtn} onPress={() => Alert.alert("SUBMIT")}>
          <ThemedText style={{ textAlign: 'center', fontWeight: '700' }}>SUBMIT</ThemedText>
        </Pressable>
      </View>

      <Spacer />

      <VerifyAndUpdate value={email} setValue={setEmail} text="Email Id" btnText="verify" onClicked={() => Alert.alert("Email verify")} />

      <VerifyAndUpdate value={phoneNo} setValue={setPhoneNO} text="Phone number" btnText="update" onClicked={() => Alert.alert("Phone number update")} />
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
  }
})