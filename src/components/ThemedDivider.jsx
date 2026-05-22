import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedDivider = () => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <View style={{ width: '100%', height: 2, backgroundColor: theme.uiBackground }} />
    )
}

export default ThemedDivider

const styles = StyleSheet.create({})