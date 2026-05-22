import { StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedView from './ThemedView'
import ThemedText from './ThemedText';
import { Colors } from '../constants/Colors';

const ThemedCustomProgressBar = ({ progress, style = {} }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    console.log("progress: ", progress)

    return (
        <ThemedView style={[styles.progressContainer, style]}>
            <View style={[styles.insideContainer, { width: `${clampedProgress}%`, backgroundColor: progress < 40 ? Colors.failure : progress <65 ? Colors.warning : Colors.success }]}>
                <ThemedText btnText={true} style={{ fontSize: 10 }}>{progress}%</ThemedText>
            </View>
        </ThemedView>
    )
}

export default ThemedCustomProgressBar

const styles = StyleSheet.create({
    progressContainer: {
        height: 20,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    insideContainer: {
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'red'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})