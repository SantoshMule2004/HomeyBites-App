import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'

const Logo = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark
    
    return (
        <Image
            source={theme.logo}
            style={styles.logo}
        />
    )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 50,
        resizeMode: 'cover',
        marginHorizontal: 10,
        marginVertical: 5,
    }
})