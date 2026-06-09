import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../stores/useAppTheme';

import React from 'react'
import Dialog from "react-native-dialog";

const ThemedDialogContainer = ({ visible, title, desc, value, onChangeText = {}, placeholder, btn1Label, btn2Label, btn1OnPress, btn2OnPress, addressContainer = false }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <Dialog.Container visible={visible} contentStyle={{ backgroundColor: theme.background, borderRadius: 10 }}>
            <Dialog.Title style={{ color: theme.text }}>{title}</Dialog.Title>
            <Dialog.Description style={{ color: theme.text }}>
                {desc}
            </Dialog.Description>
            {!addressContainer && <Dialog.Input value={value} style={{ padding: 10, marginBottom: 15, backgroundColor: 'transparent', borderBottomColor: theme.borderBottom }}
                onChangeText={onChangeText} placeholder={placeholder} />}
            <Dialog.Button label={btn1Label} style={{ color: theme.text, backgroundColor: theme.uiBackground, marginRight: 5, borderRadius: 5 }} onPress={btn1OnPress} />
            <Dialog.Button label={btn2Label} style={{ color: theme.uiBackground, backgroundColor: theme.iconColorFocused, borderRadius: 5 }} onPress={btn2OnPress} />
        </Dialog.Container>
    )
}

export default ThemedDialogContainer

const styles = StyleSheet.create({})