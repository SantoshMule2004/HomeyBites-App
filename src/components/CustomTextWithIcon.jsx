import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import IonIcons from './IonIcons'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

const CustomTextWithIcon = ({ text, iconName, addNewAddress }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <TouchableOpacity style={[styles.titleContainer, { backgroundColor: theme.uiBackground}]} onPress={addNewAddress}>
            <ThemedText title={true} style={styles.title}>{text}</ThemedText>
            <IonIcons name={iconName} style={{ backgroundColor: 'transparent' }} size={24} />
        </TouchableOpacity>
    )
}

export default CustomTextWithIcon

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 1,
    },
    title: {
        fontSize: 15,
    },
})