import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import Ionicons from 'react-native-vector-icons/Ionicons';

const IonIcons = ({ name, size = 10, style = {}, ...props }) => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <Ionicons
      name={name}
      size={size}
      style={[{ color: theme.text, backgroundColor: theme.navBackground , borderRadius: 50 }, style]}
      {...props}   />
  )
}

export default IonIcons

const styles = StyleSheet.create({})