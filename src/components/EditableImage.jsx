import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IonIcons from './IonIcons';

const EditableImage = ({ onEditPressed }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/user-profile.png')}
                style={styles.image}
            />
            <IonIcons
                name="pencil"
                size={18}
                color="white"
                style={styles.icon}
                onPress={onEditPressed}
            />
        </View>
    );
}

export default EditableImage

const styles = StyleSheet.create({
    container: {
        position: 'relative', // Allows absolute positioning of children
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    icon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(0,0,0,0.5)', // Optional: for better visibility
        borderRadius: 50,
        padding: 4,
    },
})