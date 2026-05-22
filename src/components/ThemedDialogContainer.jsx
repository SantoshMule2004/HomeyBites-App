import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import Dialog from "react-native-dialog";
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../stores/useAppTheme';

const ThemedDialogContainer = ({ visible, title, desc, value, onChangeText, placeholder, btn1Label, btn2Label, btn1OnPress, btn2OnPress }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <Dialog.Container visible={visible} contentStyle={{ backgroundColor: theme.background, borderRadius: 10 }}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
                {desc}
            </Dialog.Description>
            <Dialog.Input value={value} style={{ backgroundColor: theme.uiBackground, borderRadius: 5 }} onChangeText={onChangeText} placeholder={placeholder} />
            <Dialog.Button label={btn1Label} style={{ color: theme.text, backgroundColor: theme.uiBackground, marginRight: 5, borderRadius: 5 }} onPress={btn1OnPress} />
            <Dialog.Button label={btn2Label} style={{ color: theme.text, backgroundColor: theme.uiBackground, borderRadius: 5 }} onPress={btn2OnPress} />
        </Dialog.Container>
    )
}

export default ThemedDialogContainer

const styles = StyleSheet.create({})