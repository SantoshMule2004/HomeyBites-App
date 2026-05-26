import { StyleSheet, Pressable, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedButton = ({ style = {}, ...props }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed, { backgroundColor: theme.iconColorFocused }, style]}
            {...props} />
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn: {
        borderRadius: 5,
        padding: 18,
        marginVertical: 10
    },
    pressed: {
        opacity: 0.8
    }
})