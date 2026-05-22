import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import ThemedView from './ThemedView'
import { useAppTheme } from '../stores/useAppTheme'

const LoadingContainer = () => {
    const colorScheme = useAppTheme()
    const color = colorScheme === 'dark' ? '#fff' : '#333'
    return (
        <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={color} />
        </ThemedView>
    )
}

export default LoadingContainer

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
})