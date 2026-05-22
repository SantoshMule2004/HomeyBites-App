import { ActivityIndicator, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

import ThemedView from './ThemedView'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedLoader = () => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={theme.text} />
    </ThemedView>
  )
}

export default ThemedLoader