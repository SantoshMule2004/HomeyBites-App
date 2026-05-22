import { useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import DatePicker from 'react-native-date-picker'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedDatePicker = ({ open, date, onConfirm, onCancel, mode = 'date' }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <DatePicker
            modal
            mode={mode}
            open={open}
            date={date}
            onConfirm={onConfirm}
            onCancel={onCancel}
            buttonColor={theme.primary} />
    )
}

export default ThemedDatePicker