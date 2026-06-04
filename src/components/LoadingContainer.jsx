import { ActivityIndicator, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

import React from 'react'
import ThemedView from './ThemedView'

const LoadingContainer = ({ style = {} }) => {
    return (
        <ThemedView style={[styles.loadingContainer, style]}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </ThemedView>
    )
}

export default LoadingContainer

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 100,
        backgroundColor: 'transparent'
    },
})