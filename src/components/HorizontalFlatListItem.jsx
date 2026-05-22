import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import ThemedText from './ThemedText'
import { useAppTheme } from '../stores/useAppTheme'

const HorizontalFlatListItem = ({ item }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <ThemedText style={{ padding: 5, backgroundColor: theme.uiBackground, margin: 3, borderRadius: 5 }}>{item.value}</ThemedText>
    )
}

export default HorizontalFlatListItem

const styles = StyleSheet.create({})