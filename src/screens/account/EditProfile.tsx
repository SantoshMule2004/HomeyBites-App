import { Alert, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '../../stores/useAppTheme'
import { Colors } from '../../constants/Colors'

import EditableImage from '../../components/EditableImage'
import Spacer from '../../components/Spacer'
import VerifyAndUpdate from '../../components/VerifyAndUpdate'
import ThemedView from '../../components/ThemedView'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedText from '../../components/ThemedText'

const EditProfile = () => {
  const colorScheme: string = useAppTheme()
  const theme = colorScheme == "light" ? Colors.light : Colors.dark

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
          <ThemedText style={{ textAlign: 'center', fontWeight: '700', color: theme.iconColorFocused }}>SUBMIT</ThemedText>
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
    alignSelf: 'center'
  }
})