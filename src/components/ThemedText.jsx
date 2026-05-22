import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedText = ({ style = {}, title = false, btnText = false, ...props }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const textColor = title ? theme.title : theme.text

    return (
        <Text style={[{ color: btnText ? theme.background : textColor }, style]} {...props} />
    )
}

export default ThemedText