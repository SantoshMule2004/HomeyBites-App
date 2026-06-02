import { Keyboard, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'
import IonIcons from './IonIcons'

export interface SearchBarProps {
    placeholder?: string;
    textInput?: string;
    setTextInput?: Dispatch<SetStateAction<string>>;
    onSearch: (query: string) => void;
    style?: StyleProp<ViewStyle>;
    editable?: boolean
}

const ThemedSearchBar = ({ textInput = '', setTextInput = undefined, onSearch, placeholder, editable = true, style = {} }: SearchBarProps) => {
    const colorScheme = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    const [query, setQuery] = useState("")

    const handleClear = () => {
        setQuery("")
        Keyboard.dismiss()
    }

    return (
        <View style={[styles.searchBar, { borderColor: theme.uiBackground, backgroundColor: theme.uiBackground }, style]}>
            <IonIcons name="search" size={24} style={{ color: theme.iconColorFocused, backgroundColor: 'transparent', borderRadius: 0 }} />

            <TextInput
                style={[styles.textInput, { color: theme.text }]}
                value={textInput ? textInput : query}
                placeholder={placeholder}
                placeholderTextColor={theme.text}
                onChangeText={setTextInput ? setTextInput : setQuery}
                onSubmitEditing={() => onSearch(query)}
                returnKeyType="search"
                autoCapitalize='none'
                autoCorrect={false}
                editable={editable}
            />

            {query.length > 0 &&
                <TouchableOpacity onPress={handleClear} style={styles.btnClear}>
                    <IonIcons name="close" size={24} style={{ backgroundColor: 'transparent', borderRadius: 0 }} />
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
        borderWidth: 1,
        elevation: 2
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