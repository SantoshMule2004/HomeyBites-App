import { Pressable, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

import React from 'react'
import ThemedTextInput from './ThemedTextInput'
import IonIcons from './IonIcons'

const SecureTextInput = ({ value, setValue, iconName, onClicked, style = {}, textInputStyle = {}, secureTextEntry = false, placeholder }) => {
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    return (
        <View style={[styles.container, { borderBottomColor: theme.uiBackground, }, style]}>
            <View style={{ flex: 1 }}>
                <ThemedTextInput style={[styles.textInput]}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    onChangeText={setValue}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                />
            </View>

            <Pressable onPress={onClicked}>
                <IonIcons name={iconName} size={20} style={{ backgroundColor: 'transparent', borderRadius: 0 }} />
            </Pressable>
        </View>
    )
}

export default SecureTextInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    textInput: {
        padding: 0,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 12
    },
})