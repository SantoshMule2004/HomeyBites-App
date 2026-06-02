import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import ThemedTextInput from './ThemedTextInput'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

const VerifyAndUpdate = ({ value, setValue, text, btnText, onClicked, style = {} }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <View style={[styles.container, { borderBottomColor: theme.borderBottom },  style ]}>
            <View style={{ flex: 1 }}>
                <ThemedText style={styles.text}>{text}</ThemedText>
                <ThemedTextInput style={[styles.textInput]} onChangeText={setValue} value={value} autoCapitalize='none' />
            </View>

            <Pressable onPress={onClicked}>
                <ThemedText style={{ fontWeight: '600', color: theme.iconColorFocused }}>{btnText}</ThemedText>
            </Pressable>
        </View>
    )
}

export default VerifyAndUpdate

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
    },
    textInput: {
        padding: 10,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 12
    },
})