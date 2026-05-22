import { StyleSheet, View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedCard = ({ style = {}, ...props }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
        <View style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
            {...props} />
    )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 20
    }
})