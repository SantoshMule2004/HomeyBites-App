import { TextInput, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedTextInput = ({ style = {}, ...props }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <TextInput
            style={
                [{
                    backgroundColor: theme.uiBackground,
                    color: theme.text,
                    padding: 20,
                    borderRadius: 6
                }, style]}
                placeholderTextColor={theme.text}
            {...props}
        />
    )
}

export default ThemedTextInput