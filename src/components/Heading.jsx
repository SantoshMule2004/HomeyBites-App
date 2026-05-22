import { StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import IonIcons from './IonIcons'

const Heading = ({ title, onClick }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <View style={styles.subHeading}>
            <ThemedText style={styles.subTitle}>
                {title}
            </ThemedText>
            <IonIcons name="chevron-forward" size={20} onPress={onClick} />
        </View>
    )
}

export default Heading

const styles = StyleSheet.create({
    subHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    subTitle: {
        fontWeight: '500'
    },
    icon: {
        borderRadius: 50,
        padding: 5
    }
})