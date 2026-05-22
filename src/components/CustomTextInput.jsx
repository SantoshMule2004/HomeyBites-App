import { StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '../constants/Colors'
import ThemedView from './ThemedView'
import ThemedTextInput from './ThemedTextInput'
import { Ionicons } from '@expo/vector-icons'

const CustomTextInput = ({ iconName, editable = true, secureTextEntry = false, value, onChange, placeholder, placeholderTextColor = Colors.primary, iconStyle, textInputStyle }) => {
    return (
        <ThemedView style={styles.icoInputContainer}>
            <View>
                <Ionicons
                    name={iconName}
                    size={20}
                    style={[styles.icon, iconStyle]}
                />
            </View>
            <ThemedTextInput
                editable={editable}
                secureTextEntry={secureTextEntry}
                style={[styles.textInput, textInputStyle]}
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
            />
        </ThemedView>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    icoInputContainer: {
        flexDirection: 'row',
        width: '85%'
    },
    icon: {
        backgroundColor: Colors.primary,
        color: '#ffffff',
        padding: 10,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6
    },
    textInput: {
        width: '90%',
        color: Colors.primary,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        padding: 9
    },
})