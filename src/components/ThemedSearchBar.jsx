import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import IonIcons from './IonIcons'

const ThemedSearchBar = ({ onSearch, placeholder, editable = true, style = {} }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const [query, setQuery] = useState("")

    const handleClear = () => {
        setQuery("")
        Keyboard.dismiss()
    }

    return (
        <View style={[styles.searchBar, { borderColor: theme.uiBackground, backgroundColor: theme.uiBackground }]}>
            <IonIcons name="search" size={24} style={{ backgroundColor: 'transparent', borderRadius: 0}} />

            <TextInput
                style={[styles.textInput, { color: theme.text }]}
                value={query}
                placeholder={placeholder}
                placeholderTextColor={theme.text}
                onChangeText={(newText) => setQuery(newText)}
                onSubmitEditing={() => onSearch(query)}
                returnKeyType="search"
                autoCapitalize='none'
                autoCorrect={false}
                editable={editable}
            />

            {query.length > 0 &&
                <TouchableOpacity onPress={handleClear} style={styles.btnClear}>
                    <IonIcons name="close" size={24} style={{ backgroundColor: 'transparent', borderRadius: 0}} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default ThemedSearchBar

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 12,
        minHeight: 45,
        marginHorizontal: 16,
        marginVertical: 10,
        borderWidth: 1
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        paddingVertical: 0
    },
    btnClear: {
        padding: 4
    }
})